"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://vetsforpets-api.onrender.com/sockets");

interface Message {
  user: string;
  text: string;
}

interface ChatProps {
  userId?: string | null;
  vetId?: string | null;
}

export function ChatComponent({ userId, vetId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId || !vetId) return;

    const roomId = `${userId}-${vetId}`;
    socket.emit("joinRoom", roomId);

    const handleChatMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chatMessage", handleChatMessage);

    return () => {
      socket.off("chatMessage", handleChatMessage);
      socket.emit("leaveRoom", roomId);
    };
  }, [userId, vetId]);

  const sendMessage = () => {
    if (!message.trim() || !userId || !vetId) return;

    const roomId = `${userId}-${vetId}`;
    const newMessage: Message = { user: userId, text: message };

    socket.emit("chatMessage", { roomId, ...newMessage });
    setMessage("");
  };

  return (
    <div>
      {!userId || !vetId ? null : (
        <>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!userId || !vetId}
          />
          <button
            onClick={sendMessage}
            disabled={!userId || !vetId || !message.trim()}
          >
            Enviar
          </button>
        </>
      )}
    </div>
  );
}
