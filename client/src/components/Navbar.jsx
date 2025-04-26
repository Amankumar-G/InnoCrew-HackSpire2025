import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // adjust the path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Check if the user is logged in (via JWT in localStorage) on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (token) {
      // If token exists, set the user (assuming you have a function to get user info based on token)
      // Example: Decode the token or fetch user details from the backend if needed
      const userData = decodeToken(token);  // You could use a library like `jwt-decode` to decode the token if needed
      setUser(userData); // Set the user context with decoded token data or user object
    } else {
      setUser(null); // If no token, clear the user context
    }
  }, [setUser]);

  // Function to decode JWT (example, you can install `jwt-decode` if needed)
  function decodeToken(token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Basic decoding (replace with proper decoding if needed)
      return decoded;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  function login() {
    navigate('/login');
  }

  function logout() {
    // Clear user context and token
    setUser(null);
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    navigate('/login');
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#29293D]">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#A29BFE]">
        <Link to="/">Learnify</Link>
      </div>

      {/* Menu Items */}
      <div className="flex items-center gap-6">
        {user && (
          <>
            <button 
              onClick={() => navigate('/dead-and-dumb')} 
              className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
            >
              Deaf and dumb
            </button>
            <button 
              onClick={() => navigate('/quizzes')} 
              className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
            >
              Smart Quizzes
            </button>
            <button 
              onClick={() => navigate('/pdf-assistant')} 
              className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
            >
              PDF Assistant
            </button>
            <button 
              onClick={() => navigate('/paths')} 
              className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
            >
              Personalized Paths
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-[#EDEDED] hover:text-[#A29BFE] transition-all"
            >
              Dashboard
            </button>
          </>
        )}

        {/* Login/Logout Button */}
        {user ? (
          <button 
            onClick={logout} 
            className="bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] py-2 px-4 rounded-full transition-all"
          >
            Sign Out
          </button>
        ) : (
          <button 
            onClick={login} 
            className="bg-[#A29BFE] hover:bg-[#7f73ff] text-[#1E1E2F] py-2 px-4 rounded-full transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
