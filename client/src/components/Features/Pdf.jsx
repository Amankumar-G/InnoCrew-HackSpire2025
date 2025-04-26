
// import React, { useState, useEffect, useRef } from "react";
// import { Upload, Check, Send } from "lucide-react"; // <-- Import Send icon too!

// const PdfAssistantPage = () => {
//   const [file, setFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]);

//   const randomAnswers = [
//     "This looks super interesting! 📚 Let me dive into it and get you the best answer!",
//     "I'll get back to you on that! 🤔 It needs a bit more thought.",
//     "Here's something you might find useful! Let’s explore it together!",
//     "Good question! Let me think about it carefully and I'll explain in a moment...",
//     "Based on your file, here's what I understand so far — and it's quite fascinating! 🔍",
//   ];

//   const chatEndRef = useRef(null); // Reference for the end of the chat container

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSend = () => {
//     if (!question.trim()) return;

//     const randomAnswer =
//       randomAnswers[Math.floor(Math.random() * randomAnswers.length)];

//     setMessages((prev) => [
//       ...prev,
//       { type: "user", text: question },
//       { type: "bot", text: randomAnswer },
//     ]);
//     setQuestion("");
//   };

//   useEffect(() => {
//     // Scroll to the last user message whenever messages change
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   }, [messages]); // Triggered every time the messages array changes

//   return (
//     <div className="bg-[#1E1E2F] p-8">
//       {/* Chat Section */}
//       <div className="chat-container bg-[#29293D] p-4 rounded-xl shadow-lg flex flex-col h-[70vh] overflow-y-auto space-y-3 mb-8">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`px-4 py-2 rounded-lg max-w-[65%] text-sm ${
//               msg.type === "user"
//                 ? "bg-[#A29BFE] self-end text-[#1E1E2F]"
//                 : "bg-[#39395C] text-[#EDEDED]"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {/* Add a div that marks the bottom of the chat container */}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Input + Upload Section */}
//       <div className="flex items-center gap-3">
//         {/* Upload Button */}
//         <label className="relative cursor-pointer">
//           <input
//             type="file"
//             accept=".pdf"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <div className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all">
//             {file ? <Check size={20} /> : <Upload size={20} />}
//           </div>
//         </label>

//         {/* Input Field */}
//         <input
//           type="text"
//           placeholder="Ask a question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="flex-1 p-3 rounded-lg bg-[#29293D] text-[#EDEDED] text-sm focus:outline-none"
//         />

//         {/* Send Button */}
//         <button
//           onClick={handleSend}
//           className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all"
//         >
//           <Send size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfAssistantPage;
import React, { useState, useEffect, useRef } from "react";
import { Upload, Check, Send } from "lucide-react"; // <-- Import Send icon too!

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
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!question.trim()) return;

    const randomAnswer =
      randomAnswers[Math.floor(Math.random() * randomAnswers.length)];

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
    <div className="bg-[#1E1E2F] p-8">
      {/* Chat Section */}
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
        {/* Upload Button */}
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all">
            {file ? <Check size={20} /> : <Upload size={20} />}
          </div>
        </label>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!file} // Disable the input until a file is uploaded
          className="flex-1 p-3 rounded-lg bg-[#29293D] text-[#EDEDED] text-sm focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all"
          disabled={!file} // Disable the button until a file is uploaded
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default PdfAssistantPage;
