import React, { useState } from "react";
import Chatbot from "../utils/chatbot";
import Split from "react-split";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";


const LearningPage = () => {
  const location = useLocation();
  const responseData = location.state?.responseData || [];
  const [selectedTopic, setSelectedTopic] = useState(responseData[0]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [completedPages, setCompletedPages] = useState([]); // Track completed pages
  const [clearChat, setClearChat] = useState(false);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const markPageComplete = async (pageTitle) => {
    if (!completedPages.includes(pageTitle)) {
      setCompletedPages((prev) => [...prev, pageTitle]);
    }

    try {
      await axios.post("http://localhost:5000/chat-conversation/clear", {
        page: selectedPage,
      });
      console.log("✅ Chat conversation cleared!");
      setClearChat(true); // Trigger clearing of the chat
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // loader band kar
    }
  };

  return (
    <div className="bg-[#1E1E2F] h-[90vh] flex flex-col">
      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#29293D] p-4 overflow-y-auto">
          <h2 className="text-[#A29BFE] font-semibold mb-4">Topics</h2>
          {responseData.map((topic, idx) => (
            <div
              key={idx}
              className={`cursor-pointer mb-3 p-2 rounded bg-[#39395C] text-[#EDEDED] ${
                completedPages.includes(topic.topicName) ? "bg-[#858585]" : ""
              }`}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedPage({
                  title: topic.topicName,
                  content: topic.teacherLearning,
                });
              }}
            >
              {topic.topicName}
              {completedPages.includes(topic.topicName) && (
                <CheckCircle className="inline ml-2 text-green-300" size={18} />
              )}
            </div>
          ))}
        </div>

        {/* Main Split Content */}
        {selectedPage && (
          <Split
            className="flex flex-1"
            minSize={300}
            gutterSize={3}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            gutter={() => {
              const gutter = document.createElement("div");
              gutter.className = "gutter";
              return gutter;
            }}
          >
            {/* Learning Content */}
            <div className="p-6 overflow-y-auto scrollbar-hide">
              <h1 className="text-2xl font-bold mb-4 text-[#A29BFE]">
                {selectedPage.title}
              </h1>
              <div className="prose prose-invert max-w-none text-[#EDEDED] mb-6">
                <ReactMarkdown>{selectedPage.content}</ReactMarkdown>
              </div>

              <button
                onClick={() => markPageComplete(selectedPage.title)}
                className="px-4 py-2 hover:cursor-pointer bg-green-400 text-[#1E1E2F] rounded-full font-semibold"
              >
                Mark Page as Complete
              </button>
            </div>

            {/* Chatbot */}
            <div className="p-4 bg-[#29293D] overflow-y-auto">
              <Chatbot clearChat={clearChat} />
            </div>
          </Split>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
