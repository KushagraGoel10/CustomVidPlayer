import React from "react";
import VideoPlayer from "./Components/VideoPlayer";

const App = () => {
  return (
    <div className="flex flex-col items-center space-y-8 p-10 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl font-semibold">Lazy Load Video Player</h1>

      {/* Video only loads when scrolled into view */}
      <VideoPlayer 
        src="https://www.w3schools.com/html/mov_bbb.mp4" 
        poster="https://via.placeholder.com/640x360?text=Loading+Video" 
      />

      {/* Add some space to demonstrate lazy loading */}
      <div className="h-[100vh] flex justify-center items-center">
        <p className="text-gray-400">Scroll down to load the video...</p>
      </div>

      {/* Another video to test lazy loading */}
      <VideoPlayer 
        src="https://www.w3schools.com/html/movie.mp4" 
        poster="https://via.placeholder.com/640x360?text=Loading+Video" 
      />
    </div>
  );
};

export default App;
