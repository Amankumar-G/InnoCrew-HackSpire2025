import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-[#1E1E2F] min-h-screen font-poppins text-[#EDEDED]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
