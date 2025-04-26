import React, { useState, useEffect, useRef } from "react";
import { Upload, Check, Send } from "lucide-react"; // <-- Import Send icon too!
import axios from "axios";

const PdfAssistantPage = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const randomAnswers = [
    "This looks super interesting! 📚 Let me dive into it and get you the best answer!",
    "I'll get back to you on that! 🤔 It needs a bit more thought.",
    "Here's something you might find useful! Let’s explore it together!",
    "Good question! Let me think about it carefully and I'll explain in a moment...",
    "Based on your file, here's what I understand so far — and it's quite fascinating! 🔍",
  ];

  const chatEndRef = useRef(null); // Reference for the end of the chat container

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    const formData = new FormData();
    formData.append('pdf', selectedFile);  // use selectedFile directly!

    console.log(formData.get('pdf')); // to check if file is there properly

    axios.post("http://localhost:5000/upload/one", formData)
      .then(res => console.log(res))
      .catch(err => console.error(err));
};
  

  const handleSend = () => {



    // if (!question.trim()) return;

    let randomAnswer
    //   randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
    axios.post("http://localhost:5000/chat", { userQuery:question }).then(res=>randomAnswer=res);
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: randomAnswer },
    ]);
    setQuestion("");
  };

  useEffect(() => {
    // Scroll to the last user message whenever messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]); // Triggered every time the messages array changes

  return (
    <div className="bg-[#1E1E2F] p-8 flex w-full gap-5">
      <div className="w-[25%] border-dashed border-2 rounded-xl h-[70vh] flex justify-center items-center">
                {/* Upload Button */}
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center justify-center text-white transition-all">
            {file ? <Check size={100} /> : <Upload size={100} />}
          </div>
          <div>Drag and drop the file or Upload is manually here</div>
        </label>
      </div>
      {/* Chat Section */}
      <div className="w-[75%]">
      <div className="chat-container bg-[#29293D] p-4 rounded-xl shadow-lg flex flex-col h-[70vh] overflow-y-auto space-y-3 mb-8">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg max-w-[65%] text-sm ${
              msg.type === "user"
                ? "bg-[#A29BFE] self-end text-[#1E1E2F]"
                : "bg-[#39395C] text-[#EDEDED]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {/* Add a div that marks the bottom of the chat container */}
        <div ref={chatEndRef} />
      </div>

      {/* Input + Upload Section */}
      <div className="flex items-center gap-3">

        {/* Input Field */}
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          // disabled={!file} 
          className="flex-1 p-3 rounded-lg bg-[#29293D] text-[#EDEDED] text-sm focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all"
          // disabled={!file} 
        >
          <Send size={20} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default PdfAssistantPage;
