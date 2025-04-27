import React, { useEffect } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    // New data for the nodes and edges (more nodes and edges)
    const nodes = [
      { id: 0, group: 1 },
      { id: 1, group: 1 },
      { id: 2, group: 2 },
      { id: 3, group: 2 },
      { id: 4, group: 3 },
      { id: 5, group: 3 },
      { id: 6, group: 4 },
      { id: 7, group: 4 },
      { id: 8, group: 5 },
      { id: 9, group: 5 },
    ];
  
    const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 5, target: 6 },
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 8, target: 9 },
      { source: 0, target: 4 },
      { source: 2, target: 6 },
      { source: 3, target: 7 },
      { source: 5, target: 9 },
    ];
  
    const svg = d3.select("#chart").attr("width", 700).attr("height", 520);
  
    const width = +svg.attr("width"),
      height = +svg.attr("height");
  
    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));
  
    const link = svg
      .append("g")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#7F5AF0")
      .attr("stroke-width", 2);
  
    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .attr("fill", "#FFD6A5")
      .attr("stroke", "#7F5AF0")
      .attr("stroke-width", 2)
      .call(d3.drag().on("start", dragstart).on("drag", dragged).on("end", dragend));
  
    node.append("title").text((d) => `Node ${d.id}`);
  
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
  
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  
    function dragstart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
  
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
  
    function dragend(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
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
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#E0E6F8] text-shadow-lg">
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
          <h2 className="mb-8 text-3xl font-bold text-center text-[#A29BFE]">
            Key Features
          </h2>
          <div className="grid gap-6 text-center md:grid-cols-2">
            {[
              {
                title: "Deaf and Dumb",
                desc: "Our platform supports students with hearing and speech impairments by providing visual and accessible learning materials. With adaptive features, it ensures an inclusive learning environment for all students.",
              },
              {
                title: "Smart Quizzes",
                desc: "Our quiz generator uses advanced algorithms to create quizzes based on the student's progress. It personalizes questions to test areas of strength and improvement, making learning engaging and effective.",
              },
              {
                title: "PDF Assistant",
                desc: "The PDF Assistant is designed to simplify working with PDFs. It allows you to extract text, annotate documents, and convert them into interactive content for better comprehension and collaboration.",
              },
              {
                title: "Personalized Paths",
                desc: "This feature creates a personalized learning journey for each student, considering their unique pace and learning style. Whether you're a visual learner or prefer structured content, the paths are tailored to suit your needs.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#29293D] hover:bg-[#353552] transition p-6 rounded-2xl shadow-md transform hover:scale-105"
              >
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
          <h2 className="mb-8 text-3xl font-bold text-center text-[#A29BFE]">
            What Students Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-[#29293D] p-6 rounded-2xl shadow-md hover:scale-105 transition transform">
              <p className="italic text-[#CCCCCC]">
                "Learnify made learning enjoyable and clear!"
              </p>
              <div className="mt-4 font-semibold text-[#A29BFE]">- Sarah K.</div>
            </div>
            <div className="bg-[#29293D] p-6 rounded-2xl shadow-md hover:scale-105 transition transform">
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
          <div className="mt-20 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-[#A29BFE]">Our Vision</h2>
            <p className="text-[#C0C0C0] max-w-2xl mx-auto">
              We envision a future where learning is limitless and personalized.
            </p>
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default Home;  