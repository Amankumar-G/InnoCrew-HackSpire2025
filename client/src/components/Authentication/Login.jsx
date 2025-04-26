// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import axios from "axios"; // Import Axios
const LoginPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/student/login", {
        email,
        password
      });

      const { token } = response.data;
      console.log("Login successful:", response.data);
      if (token) {
        localStorage.setItem("authToken", token);  // 🛑 Save token in storage
        setUser(email);                             // 🛑 Set user in context (optional: whatever your backend sends)
        navigate("/");                             // 🛑 Redirect to home
      } else {
        alert("Login failed. No token received.");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="h-[80%] flex items-center justify-center bg-[#1E1E2F] mt-[5%]">
      <div className="bg-[#29293D] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">Login to Your Account</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
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
            <label className="block mb-1 text-sm text-gray-300">Password</label>
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

        <div className="mt-6 text-center">
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
