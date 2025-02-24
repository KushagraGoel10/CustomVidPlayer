// created a component where I can call this loading percentage as props ( whatever i want to divide the video) 
// then the code functions as per that 
// for eg chunkCount can be calculated as 100/ props something like that and the condition down below is also changed

// made the component dynamic by passing the chunk percentage as prop.
// using this way we can control the video percentage without modifying the code. 

// WE CAN CONSIDER THIS AS THE FINAL COMPONENT. 
// Can use this component in our app.js as following-> 

// <ChunkedVideoPlayer src = "video url" chunkSize = {5} />  -> It loads the video in 20 parts. (5% chunks)
// <ChunkedVideoPlayer src = "video url" chunkSize = {10} />  -> It loads the video in 10 parts. (10% chunks)

import React, { useEffect, useRef, useState } from "react";

const ChunkedVideoPlayer = ({ src, chunkSize}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(1);
  const totalChunks = Math.ceil(100 / chunkSize); // Calculate chunks dynamically -> Math.ceil to convert the integer to whole number. 

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
    const nextChunkEndTime = ((currentChunk * chunkSize) / 100) * duration; // Calculate chunk range dynamically

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
