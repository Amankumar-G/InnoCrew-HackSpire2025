import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";

const Chatbot = ({ clearChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (clearChat) {
      setMessages([]); // Clear messages
    }
  }, [clearChat]);
  
  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = input;
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");
  
    try {
      const response = await axios.post("http://localhost:5000/chat-conversation/send", {
        message: userMessage,
      });
  
      const botReply = response.data?.response || "Hmm... I couldn't understand that.";
      
      setMessages((prev) => [...prev, { type: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [...prev, { type: "bot", text: "❌ Error connecting to server." }]);
    }
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
