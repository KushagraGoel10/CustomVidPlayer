// This is for more than 1 videos in your react app. 
// It will load only the video which is present on the homepage. and it will tell us to scroll down to see the other video 

// Uses IntersectionObserver → Loads video only when it's near the viewport
// Works with multiple videos in your app. ( long scroll) 
// No 3rd party - pure js and react.


import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true); // Load video only when visible
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Load when 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        poster={poster} 
        className="rounded-lg shadow-lg"
      >
        {isLoaded && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
};

export default VideoPlayer;
