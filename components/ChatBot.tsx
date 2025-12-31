"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";
import { Send, MessageCircle, X, Loader2, CheckCheck, Check } from "lucide-react";

type Message = {
  id: string;
  conversationId: string;
  sender: "visitor" | "admin";
  text: string;
  createdAt: string;
  read?: boolean;
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
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedHistory = useRef(false);

  // Load message history from API when conversation exists
  const loadMessageHistory = useCallback(async (convId: string) => {
    if (hasLoadedHistory.current) return;
    
    setIsLoadingHistory(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SOCKET_URL || "http://ec2-44-210-134-149.compute-1.amazonaws.com"}/api/messages?conversationId=${convId}`
      );
      
      if (response.ok) {
        const history = await response.json();
        setMessages(history);
        hasLoadedHistory.current = true;
      } else if (response.status === 404 || response.status === 400) {
        // Conversation doesn't exist anymore, clear localStorage and start fresh
        console.log("[Visitor] Conversation not found, starting new conversation");
        localStorage.removeItem("conversation_id");
        setConversationId(null);
        hasLoadedHistory.current = false;
        
        // Restart conversation
        const visitorId = localStorage.getItem("visitor_id") || uuidv4();
        socket.emit("visitor:start", { visitorId });
      }
    } catch (err) {
      console.error("Failed to load message history:", err);
      // If error, also try to start fresh
      localStorage.removeItem("conversation_id");
      setConversationId(null);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Initialize socket connection when chat opens
  useEffect(() => {
    if (!open) return;

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitor_id", visitorId);
    }

    // Connect socket
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("[Visitor] Socket connected:", socket.id);
      setIsConnected(true);
      setError(null);
      
      const savedConversation = localStorage.getItem("conversation_id");

      if (savedConversation) {
        // Try to load history first to validate conversation exists
        loadMessageHistory(savedConversation).then(() => {
          // Only join if conversation is valid (not cleared by loadMessageHistory)
          const currentConvId = localStorage.getItem("conversation_id");
          if (currentConvId) {
            setConversationId(currentConvId);
            socket.emit("chat:join", { conversationId: currentConvId });
          }
        });
      } else {
        // Start new conversation
        socket.emit("visitor:start", { visitorId });
      }
    };

    const handleDisconnect = (reason: string) => {
      console.log("[Visitor] Socket disconnected:", reason);
      setIsConnected(false);
    };

    const handleConnectError = (err: Error) => {
      setError("Connection failed. Please try again.");
      console.error("[Visitor] Socket connection error:", err);
    };

    const handleChatStarted = ({ conversationId: newConvId, isNewConversation }: { 
      conversationId: string;
      isNewConversation?: boolean;
    }) => {
      console.log("[Visitor] Chat started:", newConvId, "isNew:", isNewConversation);
      localStorage.setItem("conversation_id", newConvId);
      setConversationId(newConvId);
      socket.emit("chat:join", { conversationId: newConvId });
      
      // Load history if rejoining existing conversation
      if (!isNewConversation) {
        loadMessageHistory(newConvId);
      } else {
        // Clear messages for new conversation
        setMessages([]);
        hasLoadedHistory.current = true;
      }
    };

    const handleMessage = (msg: Message) => {
      console.log("[Visitor] Message received:", msg);
      
      if (msg.conversationId === conversationId || !conversationId) {
        setMessages((prev) => {
          // Remove any pending messages with same text
          const filtered = prev.filter(m => !(m.pending && m.text === msg.text));
          
          // Check if message already exists
          if (filtered.some(m => m.id === msg.id)) {
            return filtered;
          }
          
          return [...filtered, msg];
        });
      }
    };

    const handleTyping = ({ sender, isTyping: typing }: { 
      sender: string; 
      isTyping: boolean;
    }) => {
      if (sender === "admin") {
        setIsTyping(typing);
      }
    };

    const handleError = ({ message }: { message: string }) => {
      console.error("[Visitor] Socket error:", message);
      setError(message);
      
      // If error is about invalid conversation, clear and restart
      if (message.includes("conversation") || message.includes("not found")) {
        localStorage.removeItem("conversation_id");
        setConversationId(null);
        setMessages([]);
        
        // Restart conversation
        const visitorId = localStorage.getItem("visitor_id") || uuidv4();
        setTimeout(() => {
          socket.emit("visitor:start", { visitorId });
        }, 1000);
      }
      
      setTimeout(() => setError(null), 5000);
    };

    // Socket event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("chat:started", handleChatStarted);
    socket.on("chat:message", handleMessage);
    socket.on("chat:typing", handleTyping);
    socket.on("error", handleError);

    // If already connected, trigger connect handler
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("chat:started", handleChatStarted);
      socket.off("chat:message", handleMessage);
      socket.off("chat:typing", handleTyping);
      socket.off("error", handleError);
      
      // Don't disconnect socket on unmount - keep it alive for notifications
      // socket.disconnect();
    };
  }, [open, conversationId, loadMessageHistory]);

  // Reset history flag when conversation changes
  useEffect(() => {
    hasLoadedHistory.current = false;
  }, [conversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle typing indicator
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (conversationId && isConnected) {
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
  }, [conversationId, isConnected]);

  const send = useCallback(() => {
    if (!input.trim() || !conversationId || !isConnected) return;

    const messageText = input.trim();

    // Optimistically add message to UI
    const pendingMessage: Message = {
      id: `pending-${Date.now()}`,
      conversationId,
      sender: "visitor",
      text: messageText,
      createdAt: new Date().toISOString(),
      pending: true,
      read: false
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    msgs.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

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
            <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-sm text-red-700 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Messages */}
          <main className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {isLoadingHistory && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Loader2 size={32} className="animate-spin mb-3" />
                <p className="text-sm">Loading messages...</p>
              </div>
            )}

            {!isLoadingHistory && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center px-4">
                <MessageCircle size={48} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">Welcome to BlackFrogs Assist!</p>
                <p className="text-xs mt-1">How can we help you today?</p>
              </div>
            )}

            {!isLoadingHistory && Object.entries(messageGroups).map(([date, msgs]) => (
              <div key={date}>
                {/* Date separator */}
                <div className="flex items-center justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {date === new Date().toLocaleDateString() ? "Today" : date}
                  </div>
                </div>

                {/* Messages for this date */}
                {msgs.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "visitor" ? "justify-end" : "justify-start"
                    } animate-fadeIn mb-3`}
                  >
                    <div className={`max-w-[80%] ${m.pending ? 'opacity-60' : 'opacity-100'}`}>
                      <div
                        className={`px-4 py-2.5 text-sm break-words shadow-sm transition-all
                          ${
                            m.sender === "visitor"
                              ? "bg-gradient-to-br from-green-400 to-green-500 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-md"
                              : "bg-white text-gray-800 rounded-tr-2xl rounded-br-2xl rounded-tl-md border border-gray-200"
                          }`}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                      </div>
                      <div className={`text-xs mt-1 px-1 flex items-center gap-1 ${
                        m.sender === "visitor" ? "justify-end text-gray-500" : "justify-start text-gray-400"
                      }`}>
                        <span>{formatTime(m.createdAt)}</span>
                        {m.sender === "visitor" && !m.pending && (
                          <span>
                            {m.read ? (
                              <CheckCheck size={14} className="text-blue-500" />
                            ) : (
                              <Check size={14} className="text-gray-400" />
                            )}
                          </span>
                        )}
                        {m.pending && (
                          <Loader2 size={12} className="animate-spin" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
            {!isConnected && (
              <div className="mb-2 text-center">
                <p className="text-xs text-orange-500">
                  Reconnecting to server...
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isConnected && conversationId ? "Type a message..." : "Connecting..."}
                disabled={!isConnected || !conversationId}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                onClick={send}
                disabled={!input.trim() || !isConnected || !conversationId}
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