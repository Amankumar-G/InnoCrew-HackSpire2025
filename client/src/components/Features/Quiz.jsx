import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SmartQuizSingle() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const totalQuestions = 7; // Showing only 6-7 questions
  const token = localStorage.getItem("authToken"); // assuming you saved auth token in localStorage

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedQuestions = res.data.questions.slice(0, totalQuestions); // select only needed
        const formattedQuestions = fetchedQuestions.map((q) => ({
          question: q.question,
          options: Object.values(q.options),
          correctAnswer: q.options[q.correct_option],
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      if (option === questions[currentQuestionIndex].correctAnswer) {
        setCorrect(true);
      }
    }
  };

  const clickNext = () => {
    if (correct) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex >= totalQuestions - 1) {
      setShowScore(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setCorrect(false);
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

  if (questions.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#1E1E2F] text-white">
        Loading Questions...
      </main>
    );
  }

  return (
    <main className="mt-[5%] bg-[#1E1E2F] font-poppins flex flex-col items-center justify-center p-6 scroll-smooth">
      <div className="bg-[#2D2A4A] rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        {!showScore ? (
          <>
            {/* Question Text */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#E0E6F8]">
                {questions[currentQuestionIndex].question}
              </h1>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {questions[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={`w-full text-lg py-4 rounded-2xl shadow-md transition
                    ${
                      selectedOption
                        ? option === questions[currentQuestionIndex].correctAnswer
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
                <div className="text-2xl font-bold text-white">
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
