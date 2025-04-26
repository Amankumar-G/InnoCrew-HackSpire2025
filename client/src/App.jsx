import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import {UserProvider} from './context/userContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/Authentication/Login';
import SignUpPage from './components/Authentication/SignUp';

const App = () => {
  return (
    <UserProvider>
      <Router>
    <div className="bg-[#1E1E2F] min-h-screen font-poppins text-[#EDEDED]">
      <Navbar />
      <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </main>
      <Footer />
    </div>
    </Router>
    </UserProvider>
  );
};

export default App;
