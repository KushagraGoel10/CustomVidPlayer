// progressive loading in chunks 
// loads first 25% of the video, then after completion the other 25% and so on. 
// Continuing the process until the full video is loaded.
// reduces server load and minimalize initial loading time of the video. 

// used onTimeUpdate for loading the next chunk. 
// using range here that from 0 to 25 it is completed then 25 to 50 then 50-75 etc
import React, { useEffect, useRef, useState } from "react";

const ChunkedVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(1);
  const chunkCount = 4; // Split video into 4 parts

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load the first chunk (initial 25%)
    const handleLoadedMetadata = () => {
      const duration = video.duration;
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
    const chunkEndTime = (currentChunk / chunkCount) * duration;

    if (video.currentTime >= chunkEndTime && currentChunk < chunkCount) {
      setCurrentChunk((prev) => prev + 1);
      video.play(); // Continue playing the next chunk
    }
  };

  return (
    <div className="flex justify-center items-center">
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        poster={poster}
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
