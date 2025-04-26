import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
  function login() {
    navigate('/login');
  }
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#29293D]">
      <div className="text-2xl font-bold text-[#A29BFE]">
        Learnify
      </div>
      <div>
        <button onClick={login} className="bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] py-2 px-4 rounded-full transition-all">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
