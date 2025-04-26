import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    username: "",
    deafMute: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/student/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: Number(formData.age),
        username: formData.username,
      });
  
      console.log("Signup successful:", response.data);
  
      // Assuming response.data.token contains the token
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        console.log("Token stored in localStorage!");
      } else {
        console.warn("No token received in response.");
      }
  
      // Optionally, redirect user or show success
      // Example: navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      // Optionally show error message to user
    }
  };
  

  return (
    <div className="min-h-screen pb-[3%] bg-[#1E1E2F] font-poppins flex items-center justify-center scroll-smooth pt-[3%]">
      <div className="bg-[#29293D] rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-[#E0E6F8] mb-8">
          Create Your Account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A0C4FF] shadow-md"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A0C4FF] shadow-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A0C4FF] shadow-md"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A0C4FF] shadow-md"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-[#E0E6F8] text-lg mb-2" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#1E1E2F] text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A0C4FF] shadow-md"
            />
          </div>

          {/* Checkbox for Deaf/Mute */}
          <div className="flex items-center space-x-3">
            <input
              id="deafMute"
              type="checkbox"
              checked={formData.deafMute}
              onChange={handleChange}
              className="w-5 h-5 rounded-xl bg-[#1E1E2F] text-[#6C63FF] focus:ring-2 focus:ring-[#A0C4FF]"
            />
            <label htmlFor="deafMute" className="text-[#B8BAD0] text-base">
              I am a deaf or mute student
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#A0C4FF] hover:bg-[#89B2FF] text-black py-4 rounded-2xl text-lg font-semibold shadow-md transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
