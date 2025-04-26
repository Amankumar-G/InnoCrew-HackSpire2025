import React, { useState } from "react";
import { dummyPages } from "../../assets/dummy"; // Dummy data
import Modal from "../utils/modal"; // Fancy Modal
import Chatbot from "../utils/chatbot"; // Our chatbot component
import Split from "react-split"; // For adjustable panes
import { CheckCircle } from 'lucide-react'; // CheckCircle icon from Lucide React

const LearningPage = () => {
  const topics = Object.keys(dummyPages);

  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completedPages, setCompletedPages] = useState([]); // Track completed pages

  const handlePageClick = (page) => {
    setSelectedPage(page);
    setShowModal(true);
  };

  const handleModalChoice = (choice) => {
    setShowModal(false);
    if (choice === "quiz") {
      // Redirect to quiz page
      console.log("Redirect to quiz page 🚀");
    }
  };

  const markPageComplete = (pageTitle) => {
    if (!completedPages.includes(pageTitle)) {
      setCompletedPages((prev) => [...prev, pageTitle]);
    }
  };

  return (
    <div className="bg-[#1E1E2F] h-[90vh] flex flex-col">
      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#29293D] p-4 overflow-y-auto">
          <h2 className="text-[#A29BFE] font-semibold mb-4">{selectedTopic}</h2>
          {dummyPages[selectedTopic].map((page, idx) => (
            <div
              key={idx}
              className={`cursor-pointer mb-3 p-2 rounded bg-[#39395C] text-[#EDEDED] ${
                completedPages.includes(page.title) ? "bg-[#858585]" : ""
              }`} // Highlight completed pages
              onClick={() => handlePageClick(page)}
            >
              {page.title}
              {completedPages.includes(page.title) && (
                <CheckCircle
                  className="ml-2 text-green-300"
                  size={18} // Set icon size
                />
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
            <div className="p-6 overflow-y-auto">
              <h1 className="text-2xl font-bold mb-4 text-[#A29BFE]">
                {selectedPage.title}
              </h1>
              <p className="text-[#EDEDED] mb-6">{selectedPage.content}</p>
              <button
                onClick={() => markPageComplete(selectedPage.title)} // Mark the current page as complete
                className="px-4 py-2 hover:cursor-pointer bg-green-400 text-[#1E1E2F] rounded-full font-semibold"
              >
                Mark Page as Complete
              </button>
            </div>

            {/* Chatbot */}
            <div className="p-4 bg-[#29293D] overflow-y-auto">
              <Chatbot />
            </div>
          </Split>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onChoice={handleModalChoice}
        />
      )}
    </div>
  );
};

export default LearningPage;
