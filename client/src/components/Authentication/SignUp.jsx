// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

const LoginPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy authentication (replace with real backend call later)
    if (email && password) {
      setUser({ email }); // Set user in context
      navigate("/"); // Redirect to home
    } else {
      alert("Please enter email and password!");
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E2F] px-4">
      <div className="bg-[#29293D] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login to Your Account</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1E1E2F] text-white focus:outline-none focus:ring-2 focus:ring-[#A0C4FF]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1E1E2F] text-white focus:outline-none focus:ring-2 focus:ring-[#A0C4FF]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#A0C4FF] text-black font-semibold py-3 rounded-xl hover:bg-[#89B2FF] transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={goToSignUp}
              className="text-[#A0C4FF] hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
