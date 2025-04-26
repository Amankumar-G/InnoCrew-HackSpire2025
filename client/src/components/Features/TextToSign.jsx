
import React, { useState } from 'react';
import axios from 'axios';
import SlidingDictionary from './SlidingDictionary';

export default function TextToSign({ handleClick }) {
  const [word, setWord] = useState('');
  const [signImage, setSignImage] = useState(null);
  const [error, setError] = useState(null);
  const [showDictionary, setShowDictionary] = useState(false); 

  const handleWord = (sign) => {
    setWord(sign);
    setShowDictionary(false); // Hide the dictionary after selecting a word (on small screens)
  };

  const generateSignImage = () => {
    setSignImage(null);
    axios
      .post('http://localhost:5000/conversion', { word },{withCredentials:true})
      .then((res) => {
        setSignImage(res.data.cloud_location);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const resetSelection = () => {
    setWord('');
    setSignImage(null);
  };

  const toggleDictionary = () => {
    setShowDictionary(!showDictionary); // Toggle dictionary visibility
  };

  return (
    <div className='flex flex-col sm:flex-row sm:items-center px-8 md:ms-4'>
      
      {/* Hamburger menu for small screens */}
      <button
        onClick={toggleDictionary}
        className="sm:hidden block border border-b-2  shadow-md mb-2 sm:text-xl font-bold px-4 py-2 h-12 mt-5 rounded-lg focus:outline-none"
      >
        Dictionary ⬇️ {/* Three-line hamburger icon */}
      </button>

      {/* Dictionary container, hidden on small screens unless toggled */}
      <div className={`basis-1/2 px-4 ${showDictionary ? 'block' : 'hidden'} sm:block`}>
        <SlidingDictionary handleWord={handleWord} />
      </div>

      <div className='md:basis-1/2 flex flex-col justify-center items-center p-5'>
        <div className='flex md:justify-between md:w-96 w-auto gap-24 px-4'>
          <button onClick={handleClick} className='font-bold hover:cursor-pointer sm:text-xl'>
            Back
          </button>
          <button onClick={resetSelection} className='font-bold hover:cursor-pointer sm:text-xl'>
            Stop
          </button>
        </div>

        <input
          type='text'
          value={word}
          placeholder='Choose word from Dictionary'
          className='border p-2 mt-4 text-center'
          disabled
        />

        <button onClick={generateSignImage} className='mt-4 p-2 bg-purple-900 hover:cursor-pointer rounded text-white'>
          Convert to Sign Image
        </button>

        {signImage ? (
          <div className='mt-4 p-2 border'>
            <img src={signImage} alt='Sign' className='size-96 w-screen md:w-96' />
          </div>
        ) : (
          <div className='mt-4 p-2 border rounded'>
           {word ? <div className='shadow-md flex flex-col justify-center items-center border gap-3  size-96 sm:w-96 w-auto px-10 text-center'>
                <img src='/upArrow.jpeg' className='size-28 rounded-full'></img>
             Click on convert to sign...
            </div>:<div className='shadow-md flex flex-col justify-center items-center border gap-3  size-96 sm:w-96 w-auto px-10 text-center'>
              
               Result will be Generated here...  
            </div>}
          </div>
        )}
      </div>
    </div>
  );
}
