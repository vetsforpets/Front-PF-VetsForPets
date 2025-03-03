"use client";

import { useUserStore } from "@/store";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  senderType: string;
}

interface ChatProps {
  userId?: string | null;
  vetId?: string | null;
}

export function ChatComponent({ userId, vetId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);

  const token = useUserStore((state) => state.userData?.token);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    // Inicializa la conexión solo si no está creada
    if (!socketRef.current) {
      const socket = io("https://vetsforpets-api.onrender.com", {
        auth: { token },
      });

      socketRef.current = socket;

      // Manejo de historial de mensajes
      const handleMessageHistory = (history: Message[]) => {
        setMessages(history);
      };

      // Manejo de mensajes en tiempo real
      const handleMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      };

      // Manejo de errores de conexión
      const handleError = (error: unknown) => {
        if (error instanceof Error) {
          console.error("Error de conexión al WebSocket:", error.message);
        } else {
          console.error("Error desconocido de WebSocket:", error);
        }
      };

      socket.on("messageHistory", handleMessageHistory);
      socket.on("message", handleMessage);
      socket.on("connect_error", handleError);

      return () => {
        socket.off("messageHistory", handleMessageHistory);
        socket.off("message", handleMessage);
        socket.off("connect_error", handleError);
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [token]);

  useEffect(() => {
    if (!userId || !vetId || !socketRef.current) return;

    const socket = socketRef.current;

    socket.emit("joinRoom", vetId, (response: { roomId: string }) => {
      if (response.roomId) {
        setRoomId(response.roomId);
      }
    });
  }, [userId, vetId]);

  useEffect(() => {
    return () => {
      if (socketRef.current && roomId) {
        socketRef.current.emit("leaveRoom", roomId);
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim() || !roomId || !socketRef.current) return;

    socketRef.current.emit("message", { roomId, message });

    setMessages((prev) => [
      ...prev,
      { sender: "Tú", message, senderType: "User" },
    ]);

    setMessage("");
  };

  return (
    <div>
      {!userId || !vetId ? null : (
        <>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.sender}:</strong> {msg.message}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!userId || !vetId}
          />
          <button onClick={sendMessage} disabled={!roomId || !message.trim()}>
            Enviar
          </button>
        </>
      )}
    </div>
  );
}
