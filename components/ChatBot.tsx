"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";
import { Send, MessageCircle, X, Loader2 } from "lucide-react";

type Message = {
  id?: string;
  sender: "visitor" | "admin";
  text: string;
  createdAt?: string;
  pending?: boolean;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize socket connection when chat opens
  useEffect(() => {
    if (!open) return;

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitor_id", visitorId);
    }

    // Connect socket
    socket.connect();

    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
      
      const savedConversation = localStorage.getItem("conversation_id");

      if (savedConversation) {
        setConversationId(savedConversation);
        socket.emit("chat:join", { conversationId: savedConversation });
      } else {
        socket.emit("visitor:start", { visitorId });
      }
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleConnectError = (err: Error) => {
      setError("Connection failed. Please try again.");
      console.error("Socket connection error:", err);
    };

    const handleChatStarted = ({ conversationId }: { conversationId: string }) => {
      localStorage.setItem("conversation_id", conversationId);
      setConversationId(conversationId);
      socket.emit("chat:join", { conversationId });
    };

    const handleChatHistory = ({ messages: historyMessages }: { messages: Message[] }) => {
      setMessages(historyMessages);
    };

    const handleMessage = (msg: Message) => {
      setMessages((prev) => {
        // Remove any pending messages with same text
        const filtered = prev.filter(m => !(m.pending && m.text === msg.text));
        return [...filtered, msg];
      });
    };

    const handleTyping = ({ sender, isTyping: typing }: { sender: string; isTyping: boolean }) => {
      if (sender === "admin") {
        setIsTyping(typing);
      }
    };

    const handleError = ({ message }: { message: string }) => {
      setError(message);
      setTimeout(() => setError(null), 5000);
    };

    // Socket event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("chat:started", handleChatStarted);
    socket.on("chat:history", handleChatHistory);
    socket.on("chat:message", handleMessage);
    socket.on("chat:typing", handleTyping);
    socket.on("error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("chat:started", handleChatStarted);
      socket.off("chat:history", handleChatHistory);
      socket.off("chat:message", handleMessage);
      socket.off("chat:typing", handleTyping);
      socket.off("error", handleError);
      socket.disconnect();
    };
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle typing indicator
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (conversationId) {
      socket.emit("chat:typing", { conversationId, isTyping: true });

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("chat:typing", { conversationId, isTyping: false });
      }, 1000);
    }
  }, [conversationId]);

  const send = useCallback(() => {
    if (!input.trim() || !conversationId || !isConnected) return;

    const messageText = input.trim();

    // Optimistically add message to UI
    const pendingMessage: Message = {
      id: uuidv4(),
      sender: "visitor",
      text: messageText,
      createdAt: new Date().toISOString(),
      pending: true
    };

    setMessages((prev) => [...prev, pendingMessage]);
    setInput("");

    // Send to server
    socket.emit("chat:message", {
      conversationId,
      text: messageText,
    });

    // Stop typing indicator
    socket.emit("chat:typing", { conversationId, isTyping: false });
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [input, conversationId, isConnected]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }, [send]);

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-tr from-green-400 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200 z-50 animate-pulse hover:animate-none"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[600px] flex flex-col z-50 bg-white shadow-2xl sm:rounded-2xl overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-4 sm:rounded-t-2xl shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">BlackFrogs Assist</h3>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-300' : 'bg-red-300'}`} />
                  <span>{isConnected ? 'Online' : 'Connecting...'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Messages */}
          <main className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center px-4">
                <MessageCircle size={48} className="mb-3 opacity-30" />
                <p className="text-sm">Welcome! How can we help you today?</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={m.id || i}
                className={`flex ${
                  m.sender === "visitor" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`px-4 py-2.5 max-w-[80%] text-sm break-words shadow-sm transition-all
                    ${m.pending ? 'opacity-60' : 'opacity-100'}
                    ${
                      m.sender === "visitor"
                        ? "bg-gradient-to-br from-green-400 to-green-500 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-md"
                        : "bg-white text-gray-800 rounded-tr-2xl rounded-br-2xl rounded-tl-md border border-gray-200"
                    }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.createdAt && (
                    <div className={`text-xs mt-1.5 ${
                      m.sender === "visitor" ? "text-green-100" : "text-gray-400"
                    }`}>
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-tr-2xl rounded-br-2xl rounded-tl-md shadow-sm border border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </main>

          {/* Input */}
          <footer className="border-t bg-white p-3 sm:rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isConnected ? "Type a message..." : "Connecting..."}
                disabled={!isConnected}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                onClick={send}
                disabled={!input.trim() || !isConnected}
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-3 rounded-full flex items-center justify-center transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-400 disabled:hover:to-green-500"
                aria-label="Send message"
              >
                {isConnected ? <Send size={18} /> : <Loader2 size={18} className="animate-spin" />}
              </button>
            </div>
          </footer>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}