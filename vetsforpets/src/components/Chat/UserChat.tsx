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

// export function UserChat({ userId, vetId }: ChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [roomId, setRoomId] = useState<string | null>(null);
//   const { userData } = useUserStore();

//   const token = userData?.token;
//   console.log(token);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     if (!token) return;

//     if (!socketRef.current) {
//       const socket = io("wss://vetsforpets-api.onrender.com", {
//         path: "/socket.io/",
//         transports: ["websocket"],
//         auth: { token },
//       });

//       socketRef.current = socket;

//       // Manejo de historial de mensajes
//       const handleMessageHistory = (history: Message[]) => {
//         setMessages(history);
//       };

//       // Manejo de mensajes en tiempo real
//       const handleMessage = (msg: Message) => {
//         setMessages((prev) => [...prev, msg]);
//       };

//       // Manejo de sala unida
//       const handleJoinedRoom = ({ roomId }: { roomId: string }) => {
//         setRoomId(roomId);
//         console.log(roomId);
//       };

//       // Manejo de errores de conexión
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

//       return () => {
//         socket.off("joinedRoom", handleJoinedRoom);
//         socket.off("messageHistory", handleMessageHistory);
//         socket.off("message", handleMessage);
//         socket.off("error", handleError);
//         socket.disconnect();
//         socketRef.current = null;
//       };
//     }
//   }, [token]);

//   useEffect(() => {
//     if (!userId || !vetId || !socketRef.current) return;

//     const socket = socketRef.current;
//     socket.emit("joinRoom", vetId);
//   }, [userId, vetId]);

//   useEffect(() => {
//     return () => {
//       if (socketRef.current && roomId) {
//         socketRef.current.emit("leaveRoom", roomId);
//       }
//     };
//   }, [roomId]);

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

interface ChatProps {
  userId?: string | null;
  vetId?: string | null;
}

export function UserChat({ userId, vetId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const { userData } = useUserStore();
  const token = userData?.token;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId || !vetId || !token) return;

    if (!socketRef.current) {
      const socket = io("wss://vetsforpets-api.onrender.com", {
        path: "/socket.io/",
        transports: ["websocket"],
        auth: { token },
      });

      socketRef.current = socket;

      // 📌 PRIMERO Definir los listeners para evitar perder eventos
      const handleJoinedRoom = ({ roomId }: { roomId: string }) => {
        setRoomId(roomId);
        console.log("Sala de chat asignada:", roomId);
      };

      const handleMessageHistory = (history: Message[]) => {
        setMessages(history);
      };

      const handleMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      };

      const handleError = (error: unknown) => {
        if (error instanceof Error) {
          console.error("Error de conexión al WebSocket:", error.message);
        } else {
          console.error("Error desconocido de WebSocket:", error);
        }
      };

      socket.on("joinedRoom", handleJoinedRoom);
      socket.on("messageHistory", handleMessageHistory);
      socket.on("message", handleMessage);
      socket.on("error", handleError);

      // 📌 AHORA emitir el evento `joinRoom`
      console.log("Uniéndose a la sala:", vetId);
      socket.emit("joinRoom", vetId);

      return () => {
        // 📌 PRIMERO remover los listeners para evitar fugas de memoria
        socket.off("joinedRoom", handleJoinedRoom);
        socket.off("messageHistory", handleMessageHistory);
        socket.off("message", handleMessage);
        socket.off("error", handleError);

        // 📌 Luego salir de la sala y desconectar el socket
        if (roomId) socket.emit("leaveRoom", roomId);
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [userId, vetId, token]);

  const sendMessage = () => {
    if (!message.trim() || !roomId || !socketRef.current) return;

    const newMessage = {
      sender: userData?.email || "Tú",
      message,
      senderType: "USER",
    };

    socketRef.current.emit("message", { roomId, message });
    setMessages((prev) => [...prev, newMessage]);
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
