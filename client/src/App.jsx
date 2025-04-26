import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { UserProvider } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/Authentication/Login";
import SignUpPage from "./components/Authentication/SignUp";
import QuizzesPage from "./components/Features/Quiz";
import PdfAssistantPage from "./components/Features/Pdf";
import Dashboard from "./components/Features/Dashboard";
import UserProfileForm from "./components/Features/UserProfileForm";
import ResponsePage from "./components/Features/ResponsePage";
import LearningPage from "./components/Features/StartPage";
import DeafAndDumb from "./components/Features/DeafAndDumb";
import './App.css';

// 👇 A new component to use useLocation inside Router
const AppContent = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/pdf-assistant", "/dashboard"];

  return (
<div className="bg-[#1E1E2F] min-h-screen flex flex-col font-poppins text-[#EDEDED]">
  <div className="sticky top-0 z-10">
  <Navbar />
  </div>
  
  <main className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/pdf-assistant" element={<PdfAssistantPage />} />
      <Route path="/paths" element={<UserProfileForm />} />
      <Route path="/response" element={<ResponsePage />} />
      <Route path="/start" element={<LearningPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/deaf-and-dumb" element={<DeafAndDumb />} />
    </Routes>
  </main>
  
  {!hideFooterRoutes.includes(location.pathname) && <Footer />}
</div>

  );
};

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

export default App;
