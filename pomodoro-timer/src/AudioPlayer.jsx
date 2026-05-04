import { useRef } from 'react';


  function AudioPlayer() {
  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/audio/lofi1.mp3" />

      {/* Play Pause button Controls */}
      <button onClick={toggleAudio}>Play/Pause</button>

      {/* Volume Controls */}
      <input type="range" min="0" max="1" step="0.01" onChange={(e) => {
        audioRef.current.volume = Number(e.target.value);}}/>
      

      
    </div>
  );
} 

export default AudioPlayer