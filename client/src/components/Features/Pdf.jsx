import React, { useState, useEffect, useRef } from "react";
import { Upload, Check, Send } from "lucide-react";
import axios from "axios";

// Typing Animation Component
const TypingAnimation = () => {
  return (
    <div style={styles.typingContainer}>
      <div style={{ ...styles.dot, animationDelay: "0s" }}></div>
      <div style={{ ...styles.dot, animationDelay: "0.2s" }}></div>
      <div style={{ ...styles.dot, animationDelay: "0.4s" }}></div>
    </div>
  );
};

// Styles for typing dots
const styles = {
  typingContainer: {
    display: "flex",
    gap: "5px",
  },
  dot: {
    width: "10px",
    height: "10px",
    backgroundColor: "#00cec9", // Light blue color for dots
    borderRadius: "50%",
    animation: "bounce 1s infinite",
  },
};

// Add keyframes for bounce animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

const Pdf = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state for actual message
  const [isTyping, setIsTyping] = useState(false); // Typing state to show the typing animation
  const chatEndRef = useRef(null);

  const handleFileUpload = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    setUploadProgress("Uploading...");

    axios.post("http://localhost:5000/upload/one", formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(`Uploading: ${percent}%`);
      }
    })
    .then(res => {
      setUploadProgress("Upload complete!");
      console.log(res);
    })
    .catch(err => {
      setUploadProgress("Upload failed!");
      console.error(err);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileUpload(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileUpload(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleSend = () => {
    if (!question.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
    ]);

    setQuestion(""); // Clear the input field

    // Set typing animation for bot
    setIsTyping(true);

    // Send the request to the chatbot
    axios.post("http://localhost:5000/chat", { userQuery: question })
      .then(res => {
        console.log(res);

        const botResponse = res.data.message || "No response"; // assuming your backend sends { answer: "..." }

        // Add bot message after getting the response
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: botResponse },
        ]);

        // Stop typing animation and hide it after bot's response
        setIsTyping(false);
      })
      .catch(err => {
        console.error(err);
        setIsTyping(false); // Stop typing animation in case of error
      });
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <div className="bg-[#1E1E2F] p-8 flex w-full gap-5">
      {/* Left Section */}
      <div className="w-[25%] flex flex-col items-start gap-4">
        {/* Upload Box */}
        <div
          className={`border-dashed border-2 rounded-xl h-[70vh] w-full flex flex-col items-center p-4 justify-centre transition-all ${
            isDragging ? "bg-[#2D2D40]" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label className="flex flex-col items-center justify-center w-[100%] h-[100%] cursor-pointer ">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="text-white transition-all ">
              {file ? <Check size={100} /> : <Upload size={100} />}
            </div>
            <div className="mt-2 text-sm text-center text-white">Upload PDF</div>
          </label>

          {/* Upload Progress */}
          <div className="mt-6 text-xs text-[#EDEDED] text-center">
            {uploadProgress && (
              <div className="p-2 bg-[#29293D] text-lg rounded-lg px-7 py-2">{uploadProgress}</div>
            )}
          </div>
        </div>

        {/* File Name BELOW the box */}
        {file && (
          <div className="w-full text-left text-sm text-[#EDEDED] truncate">
            <div className="p-3 mt-4 bg-[#29293D] rounded-lg">
              <span className="font-semibold">Selected File:</span> {file.name}
            </div>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="w-[75%]">
        <div className="chat-container bg-[#29293D] p-4 rounded-xl shadow-lg flex flex-col h-[70vh] overflow-y-auto space-y-3 mb-8">
          {messages.map((msg, index) => {
            let formattedText = msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            formattedText = formattedText.replace(/(\d+\.\s)/g, '<br/>$1');
            formattedText = formattedText.replace(/(•\s)/g, '<br/>$1');
            formattedText = formattedText.replace(/\n/g, '<br/>');

            return (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg max-w-[65%] text-sm ${
                  msg.type === "user"
                    ? "bg-[#A29BFE] self-end text-[#1E1E2F]"
                    : "bg-[#39395C] text-[#EDEDED]"
                }`}
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          })}

          {/* Display typing animation if bot is typing */}
          {isTyping && <TypingAnimation />}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input and Send */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#29293D] text-[#EDEDED] text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 flex items-center justify-center bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pdf;
