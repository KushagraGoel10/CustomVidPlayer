import React from "react";
import ChunkedVideoPlayer from "./Components/ChunkedVideoPlayer";

const App = () => {
  return (
    <div>
      <h1>Chunked Video Loading</h1>

      {/* Large 10-min video, loads in 25% chunks */}
      <ChunkedVideoPlayer 
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://via.placeholder.com/640x360?text=Loading+Video" 
      />
    </div>
  );
};

export default App;
