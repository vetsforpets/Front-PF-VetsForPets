"use client";

import { useUserStore } from "@/store";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { fetchUserData } from "@/services/servicesUser"; // ✅ Importar servicio
import { getVetById } from "@/services/servicesVet";

interface Message {
  sender: string;
  message: string;
  senderType: string;
}

interface RawMessage {
  senderId: string;
  content: string;
  senderType: string;
}
interface VetChatProps {
  chatId: string;
}

export function VetChat({ chatId }: VetChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [vetName, setVetName] = useState<string | null>(null);
  const { userData } = useUserStore();
  const token = userData?.token;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userData?.id || !token) return;

    const fetchVetName = async () => {
      try {
        const user = await getVetById(userData.id, token);
        if (user) {
          setVetName(user.name);
        }
      } catch (error) {
        console.error("Error al obtener el nombre de la veterinaria:", error);
      }
    };

    fetchVetName();
  }, [userData?.id, token]);

  useEffect(() => {
    if (!token || !chatId) return;

    const socket = io("wss://vetsforpets-api.onrender.com", {
      path: "/socket.io/",
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    // 📌 Manejadores de eventos
    const handleMessageHistory = async (history: RawMessage[]) => {
      // Mapeamos senderId a nombres
      const updatedMessages = await Promise.all(
        history.map(async (msg) => {
          let senderName = "Desconocido";

          if (msg.senderId === userData?.id) {
            senderName = vetName || "Tú";
          } else {
            try {
              const senderData = await fetchUserData(msg.senderId, token);
              senderName = senderData.name;
            } catch (error) {
              console.error(
                `Error al obtener el nombre del sender ${msg.senderId}:`,
                error
              );
            }
          }

          return {
            sender: senderName,
            message: msg.content,
            senderType: msg.senderType,
          };
        })
      );

      setMessages(updatedMessages);
    };

    const handleMessage = (msg: RawMessage) => {
      setMessages((prev) => [
        ...prev,
        {
          sender:
            msg.senderId === userData?.id ? vetName || "Tú" : "Desconocido",
          message: msg.content,
          senderType: msg.senderType,
        },
      ]);
    };

    const handleError = (error: unknown) => {
      console.error("Error en WebSocket:", error);
    };

    // 📌 Asignar eventos antes de unirse a la sala
    socket.on("messageHistory", handleMessageHistory);
    socket.on("message", handleMessage);
    socket.on("error", handleError);

    // 📌 Unirse a la sala del chat
    socket.emit("joinRoomPetshop", chatId);

    return () => {
      // 📌 Remover eventos y desconectar al desmontar
      socket.off("messageHistory", handleMessageHistory);
      socket.off("message", handleMessage);
      socket.off("error", handleError);

      socket.emit("leaveRoom", chatId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, chatId, vetName]);

  const sendMessage = () => {
    if (!message.trim() || !socketRef.current) return;

    const newMessage = {
      sender: vetName || "Petshop",
      message,
      senderType: "PETSHOP",
    };

    socketRef.current.emit("message", { roomId: chatId, message });

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el salto de línea
      sendMessage();
    }
  };

  return (
    <div className="w-full rounded-lg p-4">
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 ${
              msg.senderType === "USER"
                ? "text-customHardBrown"
                : "text-customGreen"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-l text-customGreen"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-customHardBrown hover:bg-customLightBrown cursor-pointer text-white rounded-r"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
