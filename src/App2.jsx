import React from "react";
import ChunkedVideoPlayer from "./Components/ChunkedVideoPlayer(props)";

const App = () => {
  return (
    <div>
      <h1>Chunked Video Loading (using props) </h1>

      <ChunkedVideoPlayer 
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"  chunkSize={5}     />
    </div>
  );
};

export default App;
