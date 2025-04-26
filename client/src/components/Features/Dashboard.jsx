import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Dummy performance data
  const dummyData = [
    { day: "Mon", score: 60 },
    { day: "Tue", score: 65 },
    { day: "Wed", score: 72 },
    { day: "Thu", score: 68 },
    { day: "Fri", score: 75 },
    { day: "Sat", score: 100 },
    { day: "Sun", score: 90 },
  ];

  return (
    <div className="h-100vh flex bg-[#121222] text-white font-poppins overflow-hidden">
      {/* Sidebar */}
      <aside className="w-96 bg-[#1a1a2e] p-8 flex flex-col items-center shadow-lg">
        {/* Profile Image */}
        <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-[#A0C4FF]">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230611/pngtree-screenshotsaturday-image_2937739.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <h2 className="text-2xl font-bold text-[#A0C4FF]">Alex Johnson</h2>
        <p className="text-[#C0C0C0] mt-1">alex.johnson@example.com</p>

        {/* Streak Info */}
        <div className="mt-6 bg-[#29293D] p-4 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-[#A29BFE]">7-Day Streak</h3>
          <p className="text-[#C0C0C0] text-sm mt-2">Keep it going!</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#29293D] my-6"></div>

        {/* Quick Stats */}
        <div className="space-y-3 text-center">
          <div>
            <p className="text-[#C0C0C0]">Completed</p>
            <h4 className="text-xl font-semibold text-[#FFD6A5]">15 Topics</h4>
          </div>
          <div>
            <p className="text-[#C0C0C0]">Badges</p>
            <h4 className="text-xl font-semibold text-[#FFD6A5]">4 Earned</h4>
          </div>
          <div>
            <p className="text-[#C0C0C0]">Next Goal</p>
            <h4 className="text-xl font-semibold text-[#FFD6A5]">Complete 20 Topics</h4>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1  overflow-y-auto p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-[#A0C4FF]">Welcome, Learner !!</h1>
          <p className="text-[#C0C0C0]">Track your progress and unlock new achievements!</p>
        </div>

        {/* Performance Chart */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Performance Tracker</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#29293D", borderRadius: "10px", border: "none" }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#A0C4FF"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Improvement Areas & Completed Topics */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Improvement Areas</h2>
            <ul className="list-disc ml-6 text-[#C0C0C0] space-y-2">
              <li>Focus more on Algebra Basics</li>
              <li>Review Trigonometry Concepts</li>
              <li>Practice Speed in Logical Reasoning</li>
            </ul>
          </div>

          <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Completed Topics</h2>
            <ul className="list-disc ml-6 text-[#C0C0C0] space-y-2">
              <li>Number Systems</li>
              <li>Linear Equations</li>
              <li>Basic Geometry</li>
            </ul>
          </div>
        </div>

        {/* Strengths & Growth */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg mt-10">
          <h2 className="text-2xl font-semibold mb-4">Strengths & Growth</h2>
          <p className="text-[#C0C0C0]">
            Your logical reasoning and problem-solving skills have improved by <span className="text-[#A0C4FF] font-semibold">18%</span> this month!
          </p>
          <p className="text-[#C0C0C0] mt-2">
            Suggested Next Steps: <span className="text-[#FFD6A5] font-semibold">Explore Advanced Algebra modules</span> to maintain momentum.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
