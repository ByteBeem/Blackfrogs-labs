"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";
import { Send, MessageCircle, X } from "lucide-react";

type Msg = { sender: "visitor" | "admin"; text: string; createdAt?: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitor_id", visitorId);
    }

    socket.connect();
    socket.emit("visitor:start", { visitorId });

    socket.on("chat:started", ({ conversationId }) => {
      localStorage.setItem("conversation_id", conversationId);
      setConversationId(conversationId);
      socket.emit("chat:join", { conversationId });
    });

    socket.on("chat:message", (msg: Msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat:message");
      socket.disconnect();
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !conversationId) return;

    socket.emit("chat:message", {
      conversationId,
      sender: "visitor",
      text: input.trim(),
    });

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-green-400 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-50"
      >
        <MessageCircle size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 flex flex-col z-50 bg-gray-50 sm:bg-white shadow-xl sm:rounded-xl sm:m-4">
          {/* Header */}
          <header className="flex items-center justify-between bg-white sm:bg-gradient-to-r sm:from-green-400 sm:to-blue-500 text-gray-800 sm:text-white px-4 py-3 sm:rounded-t-xl shadow-sm">
            <span className="font-semibold text-lg">BlackFrogs Assist</span>
            <X
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setOpen(false)}
            />
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto p-4 space-y-3 sm:space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "visitor" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] text-sm break-words shadow-sm
                    ${
                      m.sender === "visitor"
                        ? "bg-gradient-to-r from-green-200 to-green-300 text-gray-900 rounded-tl-xl rounded-bl-xl rounded-tr-xl"
                        : "bg-gray-200 text-gray-900 rounded-tr-xl rounded-br-xl rounded-tl-xl"
                    }`}
                >
                  {m.text}
                  {m.createdAt && (
                    <div className="text-xs text-gray-600 mt-1 opacity-80 text-right">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </main>

          {/* Input */}
          <footer className="flex items-center border-t p-3 bg-white sm:rounded-b-xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition"
            />
            <button
              onClick={send}
              className="bg-green-400 hover:bg-green-500 text-white p-3 rounded-full flex items-center justify-center transition shadow"
            >
              <Send size={18} />
            </button>
          </footer>
        </div>
      )}
    </>
  );
}
