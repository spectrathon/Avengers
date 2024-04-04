import React, { useState, useRef } from 'react';

function MeditationVideoCard({ source, length, name, thumbnail }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play(); // Play the video
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className='mb-5 relative border border-gray-900 rounded-sm shadow-lg'>
      {/* Video player */}
      <div className="relative w-96 h-56 overflow-hidden"> {/* Adjust the height as needed */}
        {/* Poster */}
        {!isPlaying && (
          <img src={thumbnail} alt="Poster" className="absolute inset-0 w-full h-full object-cover" />
        )}

        {/* Custom play button */}
        {!isPlaying && (
          <button className="absolute inset-0 flex items-center justify-center w-full h-full bg-opacity-25" onClick={handlePlay}>
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l18-9L5 3z" />
            </svg>
          </button>
        )}

        {/* Video */}
        <video ref={videoRef} className="w-full h-full video-player" poster={thumbnail} onClick={handlePlay}>
          <source src={source} />
        </video>
      </div>

      {/* Video info */}
      <div className='w-96 h-7 bg-purple-600 rounded-b-sm flex justify-between'>
        <span className='pl-3 py-1'>{name}</span>
        <span className='pr-3 py-1'>Full Length - {length} min</span>
      </div>
    </div>
  );
}

export default MeditationVideoCard;
