// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const ResponsePage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const responseData = state?.responseData || [];

//   return (
//     <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
//       <h1 className="mb-8 text-3xl font-bold">Recommended Topics</h1>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {responseData.map((item, index) => (
//           <div
//             key={index}
//             className="p-6 rounded-lg bg-[#29293D] shadow-md hover:shadow-lg transition-all"
//           >
//             <h2 className="mb-2 text-xl font-semibold">{item.topic}</h2>
//             <p
//               className={`text-sm text-white
//               }`}
//             >
//               {item.status}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Back button */}
//       <div className="flex items-end justify-between mt-10">
//         <button
//           onClick={() => navigate("/paths")}
//           className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
//         >
//           Back to Form
//         </button>
//         <button
//           onClick={() => navigate("/start")}
//           className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold"
//         >
//           Start
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResponsePage;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResponsePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state?.responseData;
  const cleanText = (responseData) => responseData.replace(/\*\*(.*?)\*\*/g, '$1');

  if (!responseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E2F] text-[#EDEDED]">
        <p className="mb-4 text-xl">No response data available!</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#A29BFE] hover:bg-[#7f73ff] rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
      <h1 className="text-3xl font-bold mb-8">Your Personalized Learning Path</h1>

      {/* Summary Message */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg mb-8 whitespace-pre-wrap">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        {/* <p>{responseData.message.split("## Student Summary")[1]?.split("## Overall Learning Path Overview")[0]}</p> */}
        <p>{cleanText(responseData.message.split("## Student Summary")[1]?.split("## Overall Learning Path Overview")[0] || "")}</p>

      </div>

      {/* Overall Learning Path Overview */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg mb-8 whitespace-pre-wrap">
        <h2 className="text-2xl font-semibold mb-4">Learning Path Overview</h2>
        {/* <p>{responseData.message.split("## Overall Learning Path Overview")[1]?.split("## Detailed Sub-Topics Section")[0]}</p> */}
        <p>{cleanText(responseData.message.split("## Overall Learning Path Overview")[1]?.split("## Detailed Sub-Topics Section")[0] || "")}</p>

      </div>

      {/* Detailed Learning Path JSON */}
      <div className="bg-[#29293D] p-6 rounded-lg shadow-lg whitespace-pre-wrap">
        <h2 className="text-2xl font-semibold mb-4">Subtopics Details</h2>
        {responseData.message.includes("```json") ? (
          <pre className="bg-[#1E1E2F] p-4 rounded-lg overflow-x-auto">
            {JSON.parse(
              responseData.message.split("```json")[1].split("```")[0]
            ).map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-[#A29BFE] mb-2">{item.subtopic_name}</h3>
                {/* <p className="mb-2"><strong>Prompt:</strong> {item.prompt}</p>
                <p className="mb-2"><strong>Goal:</strong> {item.goal_statement}</p> */}
                <p className="mb-2"><strong>Prompt:</strong> {cleanText(item.prompt)}</p>
                <p className="mb-2"><strong>Goal:</strong> {cleanText(item.goal_statement)}</p>

                <ul className="list-disc list-inside ml-4">
                  {item.key_deliverables.map((deliverable, i) => (
                    <li key={i}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            ))}
          </pre>
        ) : (
          <p>No detailed JSON available</p>
        )}
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
