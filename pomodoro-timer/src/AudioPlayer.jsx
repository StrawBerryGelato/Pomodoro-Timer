  import { useRef } from 'react';

    //For some reason by keeping it in the main jsx it was not playing. I suspect it had to do with the interval check from the timer.
    //So i made it a separate component for to fix it, but also just to declutter the main jsx
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