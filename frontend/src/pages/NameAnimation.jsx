import React, { useState, useEffect } from 'react';

const NameAnimation = () => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isWriting, setIsWriting] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWriting) {
        if (currentLetter < name.length) {
          setCurrentLetter((prevLetter) => prevLetter + 1);
        } else {
          setIsWriting(false);
        }
      } else {
        if (currentLetter > 0) {
          setCurrentLetter((prevLetter) => prevLetter - 1);
        } else {
          setIsWriting(true);
        }
      }
    }, 200); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [currentLetter, isWriting]);

  const name = "Nirvana Unlock Your Potential, Let AI Empower Your Fitness Journey.";

  return (
    <div className=" p-10 name-container text-7xl ">
      <span>
        {name.substring(0, currentLetter)}
        <span className="cursor-animation">|</span> {/* Cursor animation */}
      </span>
    </div>
  );
};

export default NameAnimation;
