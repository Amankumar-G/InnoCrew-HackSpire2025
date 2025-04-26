import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SlidingDictionary = ({handleWord}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dictionary, setDictionary] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get('http://localhost:5000/conversion/',{withCredentials:true}) 
      .then((response) => {
        setDictionary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (sign) => {
    handleWord(sign);
  };


  const filteredWords = dictionary.filter((item) =>
    item.sign_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-screen-lg p-6 rounded-lg shadow-[#A29BFE] text-white shadow  h-auto wr">
      <h3 className="text-xl sm:block hidden font-semibold mb-3">Dictionary of words</h3>
      <input
        type="text"
        placeholder="Search for a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 rounded text-white focus:outline-none focus:ring-2 ring-1 ring-gray-400 focus:ring-gray-500"
      />
      <div className="h-96  overflow-y-auto space-y-2 custom-scrollbar">
        {loading ? (
          // <p>Loading...</p> 
          <img className='m-auto mt-auto' src='/ImagesNV/output-onlinegiftools.gif'></img>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredWords.map((item, index) => (
              <div
                key={index} 
                className="shadow border border-gray-600 p-3 break-words rounded  hover:bg-gray-700 cursor-pointer transition-colors duration-300"
                onMouseDown={(e) => e.preventDefault()} // ADD THIS LINE
                onClick={() => handleClick(item.sign_name)} 
              >
                {item.sign_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidingDictionary;

