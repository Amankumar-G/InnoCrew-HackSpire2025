import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"; // For the plus icon

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    currentField: "",
    currentSkills: [""],
    interestInLearning: [""],
    dreamRoleOrExam: "",
    timeCommitmentHoursPerWeek: "",
    majorTopicToStudy: "",
    preferredPace: "",
    weakAreas: [""],
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call (mock response)
    const mockApiResponse = [
      { topic: "Node.js", status: "In the vast and ever-expanding world of technology, one constant remains unchanged: the hunger for innovation. Developers, engineers, and creative thinkers alike are constantly seeking ways to push the boundaries of what’s possible, to imagine realities that were once confined to the pages of science fiction. Whether it's the evolution of artificial intelligence that can now write entire novels or the development of intricate decentralized systems that challenge traditional financial institutions, the spirit of exploration continues to drive humanity forward. Each breakthrough carries with it not only the pride of achievement but also the responsibility to wield newfound power wisely, ethically, and inclusively. As we stand on the cusp of the next great technological revolution, we must remind ourselves that while code can solve problems, it is empathy, creativity, and collaboration that truly shape a better world for all." },
      { topic: "MongoDB", status: "In the vast and ever-expanding world of technology, one constant remains unchanged: the hunger for innovation. Developers, engineers, and creative thinkers alike are constantly seeking ways to push the boundaries of what’s possible, to imagine realities that were once confined to the pages of science fiction. Whether it's the evolution of artificial intelligence that can now write entire novels or the development of intricate decentralized systems that challenge traditional financial institutions, the spirit of exploration continues to drive humanity forward. Each breakthrough carries with it not only the pride of achievement but also the responsibility to wield newfound power wisely, ethically, and inclusively. As we stand on the cusp of the next great technological revolution, we must remind ourselves that while code can solve problems, it is empathy, creativity, and collaboration that truly shape a better world for all." },
      { topic: "System Design Basics", status: " the vast and ever-expanding world of technology, one constant remains unchanged: the hunger for innovation. Developers, engineers, and creative thinkers alike are constantly seeking ways to push the boundaries of what’s possible, to imagine realities that were once confined to the pages of science fiction. Whether it's the evolution of artificial intelligence that can now write entire novels or the development of intricate decentralized systems that challenge traditional financial institutions, the spirit of exploration continues to drive humanity forward. Each breakthrough carries with it not only the pride of achievement but also the responsibility to wield newfound power wisely, ethically, and inclusively. As we stand on the cusp of the next great technological revolution, we must remind ourselves that while code can solve problems, it is empathy, creativity, and collaboration that truly shape a better world for all." }
    ];

    // Redirect to ResponsePage with data
    navigate("/response", { state: { responseData: mockApiResponse } });
  };

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
      <h1 className="mb-8 text-3xl font-bold">Complete Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#29293D] p-8 rounded-lg shadow-lg"
      >
        {/* Render fields */}
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>

            {/* Dynamic Array Fields */}
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
              // Regular Input Fields
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

        {/* Submit Button */}
        <div className="flex justify-center md:col-span-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] rounded-full font-semibold transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
