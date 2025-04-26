import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  function login() {
    navigate('/login');
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#29293D]">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#A29BFE]">
        <Link to="/">Learnify</Link>
      </div>

      {/* Menu Items */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/deaf-and-dumb')} 
          className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
        >
          Deaf and dumb
        </button>
        <button 
          onClick={() => navigate('/quizzes')} 
          className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
        >
          Smart Quizzes
        </button>
        <button 
          onClick={() => navigate('/pdf-assistant')} 
          className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
        >
          PDF Assistant
        </button>
        <button 
          onClick={() => navigate('/paths')} 
          className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
        >
          Personalized Paths
        </button>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
        >
          Dashboard
        </button>

        {/* Login Button */}
        <button 
          onClick={login} 
          className="bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] py-2 px-4 rounded-full transition-all"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
