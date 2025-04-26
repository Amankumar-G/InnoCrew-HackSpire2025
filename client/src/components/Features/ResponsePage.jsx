import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResponsePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const responseData = state?.responseData || [];

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
      <h1 className="mb-8 text-3xl font-bold">Recommended Topics</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {responseData.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-[#29293D] shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="mb-2 text-xl font-semibold">{item.topic}</h2>
            <p
              className={`text-sm text-white
              }`}
            >
              {item.status}
            </p>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div className="flex items-end justify-between mt-10">
        <button
          onClick={() => navigate("/paths")}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
        >
          Back to Form
        </button>
        <button
          onClick={() => navigate("/start")}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ResponsePage;
