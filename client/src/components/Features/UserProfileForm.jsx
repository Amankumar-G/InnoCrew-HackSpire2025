import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";
import Loader from "../Loader"; 

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: "demo",
    age: "20",
    currentField: "information technology",
    currentSkills: ["nodejs", "docker"],
    interestInLearning: ["react"],
    dreamRoleOrExam: "full stack",
    timeCommitmentHoursPerWeek: "20",
    majorTopicToStudy: "frontend",
    preferredPace: "medium",
    weakAreas: ["css"],
    deadline: ""
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleAddField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const apiUrl = "http://localhost:5000/learning-path/path";
      const token = localStorage.getItem("authToken");

      const response = await axios.post(apiUrl, { formdata: formData }, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/response", { state: { responseData: response.data } });

    } catch (error) {
      console.error("API call failed:", error);
      alert("Failed to submit! Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10 relative">
      {loading && <Loader />} 

      <h1 className="mb-8 text-3xl font-bold">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#29293D] p-8 rounded-lg shadow-lg">
          
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>

            {["currentSkills", "interestInLearning", "weakAreas"].includes(key) ? (
              <div className="space-y-2">
                {formData[key].map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(key, index, e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-[#7f73ff]"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(key)}
                  className="flex items-center gap-2 text-[#A29BFE] hover:text-[#7f73ff] text-sm mt-2"
                >
                  <Plus size={18} /> Add More
                </button>
              </div>
            ) : (
              <input
                type={key === "deadline" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-[#7f73ff]"
              />
            )}
          </div>
        ))}

        
        <div className="flex justify-center md:col-span-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold transition"
            disabled={loading} 
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
