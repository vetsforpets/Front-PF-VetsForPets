// "use client";

// import { useUserStore } from "@/store";
// import { useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// interface Message {
//   sender: string;
//   message: string;
//   senderType: string;
// }

// interface ChatProps {
//   userId?: string | null;
//   vetId?: string | null;
// }

// export function UserChat({ vetId }: ChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [roomId, setRoomId] = useState<string | null>(null);
//   const { userData } = useUserStore();
//   const token = userData?.token;
//   const userId = userData?.id;
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     if (!userId || !vetId || !token) return;

//     if (!socketRef.current) {
//       const socket = io("wss://vetsforpets-api.onrender.com", {
//         path: "/socket.io/",
//         transports: ["websocket"],
//         auth: { token },
//       });

//       socketRef.current = socket;

//       // 📌 PRIMERO Definir los listeners para evitar perder eventos
//       const handleJoinedRoom = ({ roomId }: { roomId: string }) => {
//         setRoomId(roomId);
//         console.log("Sala de chat asignada:", roomId);
//       };

//       const handleMessageHistory = (history: Message[]) => {
//         setMessages(history);
//       };

//       const handleMessage = (msg: Message) => {
//         setMessages((prev) => [...prev, msg]);
//       };

//       const handleError = (error: unknown) => {
//         if (error instanceof Error) {
//           console.error("Error de conexión al WebSocket:", error.message);
//         } else {
//           console.error("Error desconocido de WebSocket:", error);
//         }
//       };

//       socket.on("joinedRoom", handleJoinedRoom);
//       socket.on("messageHistory", handleMessageHistory);
//       socket.on("message", handleMessage);
//       socket.on("error", handleError);

//       // 📌 AHORA emitir el evento `joinRoom`
//       console.log("Uniéndose a la sala:", vetId);
//       socket.emit("joinRoom", vetId);

//       return () => {
//         // 📌 PRIMERO remover los listeners para evitar fugas de memoria
//         socket.off("joinedRoom", handleJoinedRoom);
//         socket.off("messageHistory", handleMessageHistory);
//         socket.off("message", handleMessage);
//         socket.off("error", handleError);

//         // 📌 Luego salir de la sala y desconectar el socket
//         if (roomId) socket.emit("leaveRoom", roomId);
//         socket.disconnect();
//         socketRef.current = null;
//       };
//     }
//   }, [userId, vetId, token]);

//   const sendMessage = () => {
//     if (!message.trim() || !roomId || !socketRef.current) return;

//     const newMessage = {
//       sender: userData?.email || "Tú",
//       message,
//       senderType: "USER",
//     };

//     socketRef.current.emit("message", { roomId, message });
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage("");
//   };

//   return (
//     <div>
//       {!userId || !vetId ? null : (
//         <>
//           <div>
//             {messages.map((msg, index) => (
//               <p key={index}>
//                 <strong>{msg.sender}:</strong> {msg.message}
//               </p>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             disabled={!userId || !vetId}
//           />
//           <button onClick={sendMessage} disabled={!roomId || !message.trim()}>
//             Enviar
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useUserStore } from "@/store";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  senderType: string;
}

interface UserChatProps {
  chatId: string; // Ahora recibe directamente el chatId
}

export function UserChat({ chatId }: UserChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { userData } = useUserStore();
  const token = userData?.token;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !chatId) return;

    const socket = io("wss://vetsforpets-api.onrender.com", {
      path: "/socket.io/",
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    // 📌 Manejadores de eventos
    const handleMessageHistory = (history: Message[]) => {
      setMessages(history);
    };

    const handleMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleError = (error: unknown) => {
      console.error("Error en WebSocket:", error);
    };

    // 📌 Asignar eventos antes de unirse a la sala
    socket.on("messageHistory", handleMessageHistory);
    socket.on("message", handleMessage);
    socket.on("error", handleError);

    // 📌 Unirse a la sala del chat
    console.log("Uniéndose al chat:", chatId);
    socket.emit("joinRoom", chatId);

    return () => {
      // 📌 Remover eventos y desconectar al desmontar
      socket.off("messageHistory", handleMessageHistory);
      socket.off("message", handleMessage);
      socket.off("error", handleError);

      socket.emit("leaveRoom", chatId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, chatId]);

  const sendMessage = () => {
    if (!message.trim() || !socketRef.current) return;

    const newMessage = {
      sender: "Tú",
      message,
      senderType: "USER",
    };

    socketRef.current.emit("message", { roomId: chatId, message });

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="w-full mt-4 border border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-bold">Chat de Emergencia</h3>
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 ${
              msg.senderType === "USER" ? "text-blue-600" : "text-green-600"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
