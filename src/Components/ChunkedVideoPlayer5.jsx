// For range in 5's, 0-5, 5-10 etc 
// Use chunkCount as 20 for 5% loading (5*20= 100) i.e splitting the video in 20 parts.
// Making another function for the same. 

// also, one more thing -> I should call these percentage of video into props for eg. if someone takes my component, he can call the percentage 
// from props whatever he wants. ( just as it changed right now, i coded for 25% and then it changed to 5% according to the needs.) 
// so writing a function which uses props, with the x number of percentage then it will be great. 
// we just have to change the chunkCount and divide it into equal parts. ( divide by 100 )


import React, { useEffect, useRef, useState } from "react";

const ChunkedVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(1);
  const totalChunks = 20; // Divide the video into 20 parts

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const nextChunkEndTime = ((currentChunk * 5) / 100) * duration; // Expanding range

    if (video.currentTime >= nextChunkEndTime && currentChunk < totalChunks) {
      setCurrentChunk((prev) => prev + 1);
      video.play(); // Continue playing
    }
  };

  return (
    <div className="flex justify-center items-center">
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        className="rounded-lg shadow-lg"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default ChunkedVideoPlayer;
