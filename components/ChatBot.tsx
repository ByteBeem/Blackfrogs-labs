"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Message = {
  from: "bot" | "user";
  text: string;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: " Welcome to BlackFrogs Assist.\nI’m here to help with repairs, pricing, and bookings.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickReplies = [
    " Screen repair pricing",
    " Battery replacement",
    "opening hours",
    " Where are you located?",
  ];

  const botReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("screen"))
      return " Screen repairs depend on model. Most are same-day. Tap WhatsApp for an instant quote.";
    if (t.includes("battery"))
      return "Battery replacements usually take under 60 minutes.";
    if (t.includes("hour"))
      return "we’re open Monday–Saturday, 9:00–17:00.";
    if (t.includes("where") || t.includes("located"))
      return " We’re based in Lydenburg. You can open Maps directly from the page.";
    return " I can connect you to WhatsApp or help you book a repair.";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: botReply(text) },
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating Launcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-foreground text-background p-4 shadow-2xl hover:scale-105 transition"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Fullscreen Chat */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-foreground text-background p-2">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="font-extrabold text-lg">BlackFrogs Assist</h2>
                <p className="text-xs text-foreground/60">
                  Smart repair support • Live guidance
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-foreground/20 p-2 hover:bg-foreground hover:text-background transition"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-xl ${
                  msg.from === "user" ? "ml-auto text-right" : ""
                }`}
              >
                <div
                  className={`inline-block rounded-3xl px-6 py-3 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-foreground text-background"
                      : "bg-foreground/10"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </main>

          {/* Quick Actions */}
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-foreground/20 px-4 py-2 text-xs font-medium hover:bg-foreground hover:text-background transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <footer className="border-t border-foreground/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about repairs, pricing, or availability…"
                className="flex-1 rounded-full border border-foreground/20 px-6 py-3 text-sm outline-none focus:border-foreground"
              />
              <button
                onClick={() => sendMessage(input)}
                className="rounded-full bg-foreground text-background p-3 hover:scale-105 transition"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
