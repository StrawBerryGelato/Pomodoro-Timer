import { useRef, useState } from 'react';

function Alarm() {
  const alarmRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAlarm = () => {
    const alarm = alarmRef.current;
    if (!alarm) return;

    if (isPlaying) {
      // Stop the alarm
      alarm.pause();
      alarm.currentTime = 0; // reset to start
      setIsPlaying(false);
    } else {
      // Start the alarm
      const playPromise = alarm.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error('Failed to play alarm:', err);
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true); // fallback
      }
    }
  };

  return (
    <>
      <audio ref={alarmRef} src="/Pomodoro-Timer/audio/alarm.mp3" loop />
      
      <button onClick={toggleAlarm}>
        {isPlaying ? 'Stop Alarm' : 'Start Alarm'}
      </button>
    </>
  );
}

export default Alarm;