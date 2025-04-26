import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
import axios from 'axios'; // Import axios

const WebcamStream = ({ handleClick }) => {
  const [start, setStart] = useState(false);
  const webcamRef = useRef(null);
  const socketRef = useRef(null);
  const [gesture, setGesture] = useState(null);
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);

  useEffect(() => {
    if (isWebSocketActive) {
      socketRef.current = io.connect('http://localhost:5000');

      socketRef.current.on('result', (data) => {
        setGesture(data.gesture_name);
      });

      socketRef.current.on('error', (message) => {
        console.error('Error:', message);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [isWebSocketActive]);

  const startWebSocket = () => {
    if (isWebSocketActive) {
      // Disconnect the socket and stop the WebSocket
      socketRef.current.disconnect();
      setIsWebSocketActive(false);
      setStart(false);
      setGesture(null);
    } else {
      axios.get('http://localhost:5000/start-websocket',
        {withCredentials:true}
      )
        .then((response) => {
          const message = response.data;

          if (message.includes('WebSocket connection is now active.')) {
            setIsWebSocketActive(true);
            setStart(true);
          }
        })
        .catch((error) => {
          console.error('Failed to start WebSocket:', error);
        });
    }
  };

  const captureFrame = useCallback(() => {
    if (webcamRef.current && socketRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        socketRef.current.emit('videoFrame', imageSrc);
      }
    }
  }, []);

  useEffect(() => {
    if (isWebSocketActive) {
      const intervalId = setInterval(captureFrame, 100);
      return () => clearInterval(intervalId);
    }
  }, [captureFrame, isWebSocketActive]);

  return (
    <div className='text-center md:p-4 pt-2 p-2 flex flex-col items-center '>
      <div className='flex justify-between md:w-96 w-screen px-5 '>
        <div onClick={handleClick}>
          <button className='font-bold p-3 m-2 sm:text-xl hover:cursor-pointer hover:text-blue-800 '>
            Back
          </button>
        </div>
        <div className='flex justify-center'>
          <button onClick={startWebSocket} className='hover:text-blue-800 hover:cursor-pointer sm:text-xl font-bold'>
            {start ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div className='border-black border-2 rounded pt-0 shadow-lg'>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          style={{
            transform: 'scaleX(-1)',
          }}
          className='rounded'
        />
      </div>
      <div style={{ marginTop: '20px' }} className="sm:text-3xl bg-purple-900 p-3 rounded-2xl">
        {gesture ? `Recognized Gesture: ${gesture}` : 'Waiting for gesture...'}
      </div>
    </div>
  );
};     

export default WebcamStream;