import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const randomReplies = [
    "That's interesting! Let me explain...",
    "Good point! Here's what I think...",
    "Let's dive deeper into that!",
    "That's a great question!",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
    setMessages((prev) => [...prev, { type: "user", text: input }, { type: "bot", text: reply }]);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 space-y-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.type === "user"
                ? "bg-[#A29BFE] self-end text-[#1E1E2F] "
                : "bg-[#39395C] text-[#EDEDED]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex mt-2">
        <input
          className="flex-1 rounded-l-full px-4 py-2 bg-[#39395C] text-[#EDEDED] focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="bg-[#A29BFE] hover:bg-[#7f73ff] rounded-r-full px-4 flex items-center"
          onClick={sendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
