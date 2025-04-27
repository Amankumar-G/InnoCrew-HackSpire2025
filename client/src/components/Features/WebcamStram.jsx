import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamStream = ({ handleClick }) => {
  const [start, setStart] = useState(false);
  const webcamRef = useRef(null);
  const socketRef = useRef(null);
  const [gesture, setGesture] = useState(null);

  const startWebSocket = () => {
    if (start) {
      // Disconnect WebSocket
      if (socketRef.current) {
        socketRef.current.close();
      }
      setStart(false);
      setGesture(null);
    } else {
      // Connect WebSocket
      socketRef.current = new WebSocket('ws://localhost:8080/ws/predict/');
      socketRef.current.binaryType = 'arraybuffer'; // Important: tell WebSocket we're sending/receiving binary

      socketRef.current.onopen = () => {
        console.log('WebSocket connected');
        setStart(true);
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received gesture:', data);
        setGesture(data.gesture_name);
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket closed');
        setStart(false);
      };
    }
  };

  const captureFrame = useCallback(() => {
    if (webcamRef.current && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Data = imageSrc.split(',')[1];
        const byteArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        socketRef.current.send(byteArray);
      }
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (start) {
      intervalId = setInterval(captureFrame, 300); // Capture a frame every 300ms (adjustable)
    }
    return () => clearInterval(intervalId);
  }, [start, captureFrame]);

  return (
    <div className='text-center md:p-4 pt-2 p-2 flex flex-col items-center'>
      <div className='flex justify-between md:w-96 w-screen px-5'>
        <div onClick={handleClick}>
          <button className='font-bold p-3 m-2 sm:text-xl hover:cursor-pointer hover:text-blue-800'>
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
          style={{ transform: 'scaleX(-1)' }}
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
