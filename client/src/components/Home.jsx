import React, { useEffect } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const data = [
      { x: 0, y: 58 },
      { x: 1, y: 92 },
    ];

    const svg = d3.select("#chart").attr("width", 400).attr("height", 300);

    const margin = { top: 20, right: 30, bottom: 30, left: 50 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#7F5AF0")
      .attr("stroke-width", 4)
      .attr("d", line);

    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 6)
      .attr("fill", "#FFD6A5")
      .attr("stroke", "#7F5AF0")
      .attr("stroke-width", 2);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const neonGlow = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  return (
    <div className="p-6 space-y-20 font-poppins text-white bg-[#1A1B2F]">
      {/* Hero Section with Futuristic Glow */}
      <motion.div
        variants={neonGlow}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl shadow-2xl min-h-[80vh] grid md:grid-cols-2 gap-12 items-center p-10 bg-gradient-to-br from-[#1A1B2F] to-[#2E335A]"
      >
        {/* Background Animated Blobs */}
        <div className="absolute w-96 h-96 bg-[#7F5AF0] opacity-20 rounded-full top-[-100px] left-[-100px] blur-3xl animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#FFD6A5] opacity-20 rounded-full bottom-[-80px] right-[-80px] blur-3xl animate-pulse"></div>

        {/* Text Content */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#E0E6F8]">
            Unlock Your <span className="text-[#7F5AF0]">True Potential</span>
          </h1>
          <p className="text-2xl text-[#C0C0C0]">
            "Every student deserves a path as unique as their dreams."
          </p>
        </div>

        {/* Futuristic Graph */}
        <div className="relative z-10 flex justify-center">
          <svg id="chart"></svg>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-8 text-3xl font-bold text-center">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-3 text-center">
          {[
            { title: "Smart Quiz Generator", desc: "Auto create quizzes based on student growth." },
            { title: "Simplified Content", desc: "Complex ideas made simple and intuitive." },
            { title: "Inclusive Learning", desc: "Support for deaf and mute students." },
          ].map((feature, i) => (
            <div key={i} className="bg-[#29293D] hover:bg-[#353552] transition p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-[#A29BFE]">{feature.title}</h3>
              <p className="text-[#C0C0C0]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
         <h2 className="mb-8 text-3xl font-bold text-center">
           What Students Say
         </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-[#29293D] p-6 rounded-2xl shadow-md">
            <p className="italic text-[#CCCCCC]">
              "Learnify made learning enjoyable and clear!"
            </p>
            <div className="mt-4 font-semibold text-[#A29BFE]">- Sarah K.</div>
          </div>
          <div className="bg-[#29293D] p-6 rounded-2xl shadow-md">
            <p className="italic text-[#CCCCCC]">
              "Quizzes are so personalized it feels like a private tutor."
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
        <div className="text-center space-y-4 mt-20">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            We envision a future where learning is limitless and personalized.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
