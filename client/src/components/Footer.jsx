import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#121222] text-[#CCCCCC] py-8 px-6">
      <div className="flex flex-col items-center justify-between mx-auto space-y-6 max-w-7xl md:flex-row md:space-y-0">
        
        {/* Left side - Logo/Name */}
        <div className="text-2xl font-bold text-[#A29BFE]">
          Learnify
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-[#A29BFE] transition">Home</a>
          <a href="#" className="hover:text-[#A29BFE] transition">Features</a>
          <a href="#" className="hover:text-[#A29BFE] transition">Testimonials</a>
          <a href="#" className="hover:text-[#A29BFE] transition">Contact</a>
        </div>

        {/* Right side - Copyright */}
        <div className="text-xs text-[#888888]">
          © {new Date().getFullYear()} Learnify. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
