// import React, { useEffect } from 'react';
// import * as d3 from 'd3';

// const Home = () => {
//   useEffect(() => {
//     drawChart();
//   }, []);

//   const drawChart = () => {
//     const data = [
//       { system: "Traditional", score: 58 },
//       { system: "Learnify", score: 92 }
//     ];

//     const svg = d3.select("#chart")
//       .attr("width", 400)
//       .attr("height", 300);

//     const margin = { top: 20, right: 30, bottom: 30, left: 50 },
//           width = +svg.attr("width") - margin.left - margin.right,
//           height = +svg.attr("height") - margin.top - margin.bottom;

//     const g = svg.append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleBand()
//       .domain(data.map(d => d.system))
//       .rangeRound([0, width])
//       .padding(0.3);

//     const y = d3.scaleLinear()
//       .domain([0, 100])
//       .rangeRound([height, 0]);

//     // X Axis
//     g.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("fill", "#EDEDED");

//     // Y Axis
//     g.append("g")
//       .call(d3.axisLeft(y))
//       .selectAll("text")
//       .attr("fill", "#EDEDED");

//     // Bars
//     g.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.system))
//       .attr("y", d => y(d.score))
//       .attr("width", x.bandwidth())
//       .attr("height", d => height - y(d.score))
//       .attr("fill", (d, i) => i === 0 ? "#FFD6A5" : "#A0C4FF"); // pastel colors
//   };

//   return (
//     <div className="p-6 space-y-20">

//       {/* New Hero Section */}
//       <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
//         {/* Left side: Quote Section */}
//         <div className="flex flex-col justify-center">
//           <h1 className="text-5xl font-bold mb-6 text-[#FFD6A5]">
//             Unlock Your True Potential
//           </h1>
//           <p className="text-2xl text-[#C0C0C0] max-w-md">
//             "Every student deserves a learning path as unique as their dreams."
//           </p>
//         </div>

//         {/* Right side: Graph */}
//         <div className="flex justify-center">
//           <svg id="chart"></svg>
//         </div>
//       </div>

//       {/* Rest of Home content (Features, Testimonials, Vision) */}
//       <div>
//         {/* Key Features Section */}
//         <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
//         <div className="grid md:grid-cols-3 gap-6 text-center">
//           <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">Smart Quiz Generator</h3>
//             <p className="text-[#C0C0C0]">Automatically create quizzes based on student progress.</p>
//           </div>
//           <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">Simplified Learning Content</h3>
//             <p className="text-[#C0C0C0]">Complex concepts broken into easy-to-digest modules.</p>
//           </div>
//           <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">Inclusive Access</h3>
//             <p className="text-[#C0C0C0]">Sign language to text support for deaf and mute learners.</p>
//           </div>
//         </div>
//       </div>

//       {/* Student Testimonials */}
//       <div>
//         <h2 className="text-3xl font-bold mb-8 text-center">What Students Say</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
//             <p className="italic text-[#CCCCCC]">
//               "Learnify helped me understand difficult topics in ways my school never could!"
//             </p>
//             <div className="mt-4 font-semibold text-[#A29BFE]">- Sarah K.</div>
//           </div>
//           <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
//             <p className="italic text-[#CCCCCC]">
//               "The quizzes are so personalized it feels like a private tutor."
//             </p>
//             <div className="mt-4 font-semibold text-[#A29BFE]">- Anuj P.</div>
//           </div>
//         </div>
//       </div>

//       {/* Vision Section */}
//       <div className="text-center space-y-4 mt-16">
//         <h2 className="text-3xl font-bold">Our Vision</h2>
//         <p className="text-[#C0C0C0] max-w-2xl mx-auto">
//           We envision a future where learning is not bound by traditional barriers — every student learns their way, at their pace.
//         </p>
//       </div>

//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const data = [
      { system: "Traditional", score: 58 },
      { system: "Learnify", score: 92 },
    ];

    const svg = d3.select("#chart").attr("width", 400).attr("height", 300);

    const margin = { top: 20, right: 30, bottom: 30, left: 50 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.system))
      .rangeRound([0, width])
      .padding(0.3);

    const y = d3.scaleLinear().domain([0, 100]).rangeRound([height, 0]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#EDEDED");

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#EDEDED");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.system))
      .attr("y", (d) => y(d.score))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.score))
      .attr("fill", (d, i) => (i === 0 ? "#FFD6A5" : "#A0C4FF")); // pastel colors
  };

  // Framer Motion variant
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 space-y-20">
      {/* Hero Section with Glass Effect */}
      <div
        className="relative grid md:grid-cols-2 gap-12 items-center min-h-[80vh] overflow-hidden backdrop-blur-md rounded-2xl shadow-2xl p-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(240, 240, 240, 0.2), rgba(200, 230, 255, 0.3))",
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f033] to-[#c8e6ff80] rounded-2xl blur-2xl opacity-30"></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6 text-[#FFD6A5]">
            Unlock Your True Potential
          </h1>
          <p className="text-2xl text-[#C0C0C0] max-w-md">
            "Every student deserves a learning path as unique as their dreams."
          </p>
        </div>

        {/* Graph */}
        <div className="relative z-10 flex justify-center">
          <svg id="chart"></svg>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">
              Smart Quiz Generator
            </h3>
            <p className="text-[#C0C0C0]">
              Automatically create quizzes based on student progress.
            </p>
          </div>
          <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">
              Simplified Learning Content
            </h3>
            <p className="text-[#C0C0C0]">
              Complex concepts broken into easy-to-digest modules.
            </p>
          </div>
          <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">
              Inclusive Access
            </h3>
            <p className="text-[#C0C0C0]">
              Sign language to text support for deaf and mute learners.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Students Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
            <p className="italic text-[#CCCCCC]">
              "Learnify helped me understand difficult topics in ways my school
              never could!"
            </p>
            <div className="mt-4 font-semibold text-[#A29BFE]">- Sarah K.</div>
          </div>
          <div className="bg-[#29293D] p-6 rounded-lg shadow-lg">
            <p className="italic text-[#CCCCCC]">
              "The quizzes are so personalized it feels like a private tutor."
            </p>
            <div className="mt-4 font-semibold text-[#A29BFE]">- Anuj P.</div>
          </div>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center space-y-4 mt-16">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            We envision a future where learning is not bound by traditional
            barriers — every student learns their way, at their pace.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
