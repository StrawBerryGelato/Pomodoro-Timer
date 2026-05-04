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
        <audio ref={audioRef} src="/Pomodoro-Timer/audio/lofi1.mp3" controls />

      </div>
    );
  } 

  export default AudioPlayer