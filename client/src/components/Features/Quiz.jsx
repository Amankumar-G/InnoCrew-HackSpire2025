import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios"; // for future use

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SmartQuizSingle() {
  const [sampleQuestion, setQuestion] = useState({
    question: "What is the integration of log(x)?",
    options: ["2x", "1/x", "x^2", "x"],
    correctAnswer: "1/x",
    difficulty: 1,
    module: "alpha",
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showScore, setShowScore] = useState(false);

  const totalQuestions = 5; // updated to 5

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      if (option === sampleQuestion.correctAnswer) {
        setCorrect(true);
      }
    }
  };

  const clickNext = async () => {
    if (correct) {
      setScore((prev) => prev + 1);
    }
    if (questionNumber >= totalQuestions) {
      setShowScore(true);
      return;
    }

    try {
      // Dummy backend call
      /*
      await axios.post("/api/next-question", { correct }).then((res) => {
        setQuestion(res.data);
      });
      */

      // Dummy next question:
      setQuestion({
        question: "What is the derivative of x²?",
        options: ["2x", "x", "x^2", "2"],
        correctAnswer: "2x",
        difficulty: 1,
        module: "calculus",
      });
    } catch (error) {
      console.error("Error fetching next question", error);
    }

    setSelectedOption("");
    setIsAnswered(false);
    setCorrect(false);
    setQuestionNumber((prev) => prev + 1);
  };

  // Pie Chart Config
  const chartData = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [score, totalQuestions - score],
        backgroundColor: ["#34D399", "#EF4444"], // green and red
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%", // make center empty
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <main className="mt-[5%] bg-[#1E1E2F] font-poppins flex flex-col items-center justify-center p-6 scroll-smooth">
      <div className="bg-[#2D2A4A] rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        
        {!showScore ? (
          <>
            {/* Question Number */}
            <div className="mb-4 text-[#E0E6F8] text-xl font-semibold text-center">
              Question {questionNumber} of 5
            </div>

            {/* Question Text */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#E0E6F8]">
                {sampleQuestion.question}
              </h1>
            </div>

            {/* Options Grid (2x2 Matrix) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {sampleQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={`w-full text-lg py-4 rounded-2xl shadow-md transition
                    ${
                      selectedOption
                        ? option === sampleQuestion.correctAnswer
                          ? "bg-green-500 text-white"
                          : option === selectedOption
                          ? "bg-red-500 text-white"
                          : "bg-[#37355A] text-[#E0E6F8]"
                        : "bg-[#37355A] text-[#E0E6F8] hover:bg-[#4B4B70]"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-center">
                <button
                  onClick={clickNext}
                  className="bg-[#A29BFE] hover:bg-[#63639b] text-[#1E1E2F] py-3 px-8 rounded-2xl text-lg shadow-md transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          // Final Score Page
          <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#E0E6F8] mb-6">
            Quiz Completed!
          </h2>

          <div className="relative w-60 h-60">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-2xl font-bold">
                {score}/{totalQuestions}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}