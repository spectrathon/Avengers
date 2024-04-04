import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-75">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playbackrate={0.3} // Adjust the playback rate as needed
      >
        <source src="/5155396-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
