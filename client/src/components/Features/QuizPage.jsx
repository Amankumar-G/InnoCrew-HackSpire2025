import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPage = location.state?.selectedPage; // Get the page data from state

  const [questions, setQuestions] = useState([]); // State to hold questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Store answers
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Prevent multiple requests and only fetch once
    if (selectedPage && questions.length === 0) {
      const sendContent = async () => {
        try {
          console.log("Page Content Being Sent:", selectedPage?.content);
          await axios.post("http://localhost:5000/chat-conversation/initialize", {
            systemPrompt: selectedPage.content,
          });

          const response = await axios.post("http://localhost:5000/chat-conversation/clear", {
            page: selectedPage.content,
          });
          console.log("✅ Response from backend:", response.data.response);

          // Assuming the backend will send 5 questions
          const quizData = response.data.response?.quiz || [];
          setQuestions(quizData); // Store quiz questions
        } catch (error) {
          console.error("❌ Error sending content to backend:", error);
        }
      };

      sendContent();
    }
  }, [selectedPage, questions.length]); // Dependency on questions.length to prevent multiple requests

  // Handle when an answer is selected
  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  // Handle submitting the quiz
  const handleSubmitQuiz = () => {
    const score = userAnswers.reduce((acc, answer, idx) => {
      if (answer === questions[idx]?.correct_option) acc++;
      return acc;
    }, 0);

    // If score is sufficient, mark as completed and navigate to '/start'
    if (score >= 3) {
      navigate("/start", {
        state: { markAsComplete: selectedPage.title }, // Mark topic as complete
      });
    } else {
      alert("You did not pass the quiz. Try again!");
      navigate("/start", {
        state: { markAsFailed: selectedPage.title }, // Mark as failed
      });
    }
    setQuizCompleted(true);
  };

  // Handle next question navigation
  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  // Handle previous question navigation
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-[#1e1e2f] text-[#e0e6f8] p-6 font-poppins">
      <h1 className="mb-4 text-2xl font-semibold">{selectedPage?.title}</h1>

      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="bg-[#2d2a4a] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-semibold">{questions[currentQuestionIndex]?.question}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(questions[currentQuestionIndex]?.options).map(([key, value]) => (
              <div key={key}>
                <input
                  type="radio"
                  id={key}
                  name="answer"
                  value={key}
                  checked={userAnswers[currentQuestionIndex] === key}
                  onChange={() => handleAnswerSelect(key)}
                  className="mr-2"
                />
                <label htmlFor={key} className="text-[#e0e6f8]">{value}</label>
              </div>
            ))}
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-[#37355a] text-[#e0e6f8] py-2 px-4 rounded-lg hover:bg-[#4b4b70] disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-[#37355a] text-[#e0e6f8] py-2 px-4 rounded-lg hover:bg-[#4b4b70] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : quizCompleted ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">Quiz Completed!</h2>
          <button
            onClick={() => navigate("/start")}
            className="mt-6 bg-[#a29bfe] text-[#1e1e2f] py-3 px-8 rounded-lg hover:bg-[#63639b]"
          >
            Back to Start
          </button>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}

      <button
        onClick={handleSubmitQuiz}
        className="mt-6 w-full bg-[#a29bfe] text-[#1e1e2f] py-3 px-8 rounded-lg hover:bg-[#63639b]"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
