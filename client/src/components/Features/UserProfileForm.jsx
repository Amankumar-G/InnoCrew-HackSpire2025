import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios"; // Import Axios

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "demo",
    age: "20",
    currentField: "information technology",
    currentSkills: ["nodejs","docker"],
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

    try {
      // Example API endpoint
      const apiUrl = "http://localhost:5000/learning-path/path";

      // Bearer token (you can dynamically get it from localStorage or state if needed)
      const token = localStorage.getItem("authToken"); 
        console.log("Token:", token);
        // console.log("Form Data:", formData);
      // const response = await axios.post(apiUrl, {formdata : formData}, {
      //   withCredentials: true,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
     const response = {data : {
        "message": "## Student Summary  \nMeet demo, a 20-year-old aspiring full stack developer with a current background in information technology. With skills in Node.js and Docker, demo is ready to expand into the frontend realm, particularly focusing on learning React. With a commitment of 20 hours per week and a medium-paced learning preference, demo aims to enhance their capabilities while addressing weaknesses in CSS, which will bolster their overall skillset for pursuing a career as a full stack developer. \n\n## Overall Learning Path Overview  \n1. **Fundamentals of CSS**  \n2. **Responsive Web Design**  \n3. **Introduction to React**  \n4. **State Management in React**  \n5. **Creating Components in React**  \n6. **Integrating APIs with React**  \n7. **Building and Deploying a Full Stack Application**\n\n## Detailed Sub-Topics Section  \n\n### 1. Fundamentals of CSS  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to apply fundamental CSS concepts to style webpages effectively.  \n- **Key Deliverables:**  \n  - CSS styling project for a simple webpage  \n  - Quiz on CSS properties and selectors  \n  - Write-up explaining key CSS concepts (flexbox, grid, etc.)  \n- **Skill Progression Guidance:**  \n  - Start by learning basic selectors, properties, and values.  \n  - Progress to more complex concepts like the box model, positioning, and layout techniques.  \n- **Recommended Time Allocation:**  \n  - Spend 4 hours on learning the basics and reviewing documentation.  \n  - Dedicate 4 hours to practice through projects and quizzes.  \n\n### 2. Responsive Web Design  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to create responsive layouts that adapt to different screen sizes.  \n- **Key Deliverables:**  \n  - Responsive webpage project  \n  - Quiz on media queries and responsive frameworks  \n- **Skill Progression Guidance:**  \n  - Begin with understanding media queries.  \n  - Layer in framework usage, like Bootstrap or Tailwind CSS, to enhance responsiveness.  \n- **Recommended Time Allocation:**  \n  - 5 hours on concepts and frameworks.  \n  - 3 hours focused on building a responsive project.  \n\n### 3. Introduction to React  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to create basic React applications using components and state.  \n- **Key Deliverables:**  \n  - Simple React application project (e.g., To-Do List)  \n  - Quiz on React fundamentals (components, props, state)  \n- **Skill Progression Guidance:**  \n  - Start with JSX and functional components.  \n  - Gradually add complexity by introducing props and state management.  \n- **Recommended Time Allocation:**  \n  - 4 hours of tutorials and understanding core concepts.  \n  - 4 hours for hands-on projects to reinforce learning.  \n\n### 4. State Management in React  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to implement local state management and understand its significance in React applications.  \n- **Key Deliverables:**  \n  - State management exercise using hooks  \n  - Write-up discussing local vs. global state  \n- **Skill Progression Guidance:**  \n  - Begin with the use of the `useState` and `useEffect` hooks.  \n  - Incorporate more advanced state management techniques as proficiency grows.  \n- **Recommended Time Allocation:**  \n  - 3 hours of hands-on practice with hooks.  \n  - 2 hours for supplemental readings and application of learned concepts.  \n\n### 5. Creating Components in React  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to create reusable components and manage their structure and functionality.  \n- **Key Deliverables:**  \n  - Component library project  \n  - Quiz on component lifecycle and prop drilling  \n- **Skill Progression Guidance:**  \n  - Start with simple component creation.  \n  - Gradually incorporate them into larger applications to understand reusability.  \n- **Recommended Time Allocation:**  \n  - 3 hours spent learning component architecture.  \n  - 4 hours on projects.  \n\n### 6. Integrating APIs with React  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to fetch data from an API and display it in a React application.  \n- **Key Deliverables:**  \n  - Project using an API (e.g., fetching and displaying user data)  \n  - Quiz on API methods and error handling  \n- **Skill Progression Guidance:**  \n  - Get comfortable with the Fetch API and async/await syntax.  \n  - Practice with mock APIs before integrating complex APIs.  \n- **Recommended Time Allocation:**  \n  - 3 hours on learning API integration.  \n  - 4 hours for project implementation.  \n\n### 7. Building and Deploying a Full Stack Application  \n- **Learning Goal:** By the end of this sub-topic, the student will be able to develop and deploy a full stack application integrating frontend and backend technologies.  \n- **Key Deliverables:**  \n  - Full stack application project  \n  - Presentation of the project for peer or mentor review  \n- **Skill Progression Guidance:**  \n  - Begin by learning about RESTful services and back-end integration.  \n  - Start combining everything learned into a full stack application.  \n- **Recommended Time Allocation:**  \n  - 4 hours for planning and structuring application.  \n  - 4 hours dedicating to coding and debugging.  \n\n## Motivational & Study Tips  \n- **Break It Down:** Focus on one sub-topic at a time, devoting 20 hours a week in small, manageable chunks.  \n- **Practice Regularly:** Implement your learning through small projects to reinforce your skills.  \n- **Engagement:** Join online communities and forums related to CSS and React — leaning on peer support is vital.  \n- **Stay Positive:** Expect challenges with CSS and React, but treat them as learning opportunities rather than setbacks.  \n\n## Next Steps & Check-Ins  \n- Schedule weekly check-ins to assess your progress on sub-topics and deliverables.  \n- Track your milestones in a project management tool to visualize completed tasks.  \n- Make sure to review your learning outcomes and adjust your pace and focus as needed to meet deadlines efficiently.  \n\n## Learning Path JSON  \n```json\n[\n    {\n        \"subtopic_name\": \"Fundamentals of CSS\",\n        \"prompt\": \"Dive into the basics of CSS, learning how to style webpages effectively.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to apply fundamental CSS concepts to style webpages effectively.\",\n        \"key_deliverables\": [\n            \"CSS styling project for a simple webpage\",\n            \"Quiz on CSS properties and selectors\",\n            \"Write-up explaining key CSS concepts (flexbox, grid, etc.)\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"Responsive Web Design\",\n        \"prompt\": \"Learn to create versatile webpages that adapt to various devices.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to create responsive layouts that adapt to different screen sizes.\",\n        \"key_deliverables\": [\n            \"Responsive webpage project\",\n            \"Quiz on media queries and responsive frameworks\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"Introduction to React\",\n        \"prompt\": \"Start your journey with React, understanding its core fundamentals.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to create basic React applications using components and state.\",\n        \"key_deliverables\": [\n            \"Simple React application project (e.g., To-Do List)\",\n            \"Quiz on React fundamentals (components, props, state)\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"State Management in React\",\n        \"prompt\": \"Explore state management techniques within React applications.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to implement local state management and understand its significance in React applications.\",\n        \"key_deliverables\": [\n            \"State management exercise using hooks\",\n            \"Write-up discussing local vs. global state\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"Creating Components in React\",\n        \"prompt\": \"Learn to build reusable components effectively in React.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to create reusable components and manage their structure and functionality.\",\n        \"key_deliverables\": [\n            \"Component library project\",\n            \"Quiz on component lifecycle and prop drilling\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"Integrating APIs with React\",\n        \"prompt\": \"Understand how to fetch data from APIs and utilize it in your React apps.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to fetch data from an API and display it in a React application.\",\n        \"key_deliverables\": [\n            \"Project using an API (e.g., fetching and displaying user data)\",\n            \"Quiz on API methods and error handling\"\n        ]\n    },\n    {\n        \"subtopic_name\": \"Building and Deploying a Full Stack Application\",\n        \"prompt\": \"Combine your front-end and back-end skills to build a comprehensive application.\",\n        \"goal_statement\": \"By the end of this sub-topic, the student will be able to develop and deploy a full stack application integrating frontend and backend technologies.\",\n        \"key_deliverables\": [\n            \"Full stack application project\",\n            \"Presentation of the project for peer or mentor review\"\n        ]\n    }\n]\n```"
    }}
      
      console.log("API Response:", response.data);

      // Redirect to ResponsePage with API response
      navigate("/response", { state: { responseData: response.data } });

    } catch (error) {
      console.error("API call failed:", error);
      alert("Failed to submit! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#EDEDED] p-10">
      <h1 className="mb-8 text-3xl font-bold">Complete Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#29293D] p-8 rounded-lg shadow-lg"
      >
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
