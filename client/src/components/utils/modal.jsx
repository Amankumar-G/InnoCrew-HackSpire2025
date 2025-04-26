import React from "react";

const Modal = ({ onClose, onChoice }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#29293D] p-8 rounded-lg text-center text-[#EDEDED]">
        <h2 className="mb-6 text-xl">What do you want to do?</h2>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] rounded-full font-semibold"
            onClick={() => onChoice("learn")}
          >
            Learn
          </button>
          <button
            className="px-6 py-2 bg-green-400 hover:bg-green-500 text-[#1E1E2F] rounded-full font-semibold"
            onClick={() => onChoice("quiz")}
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
