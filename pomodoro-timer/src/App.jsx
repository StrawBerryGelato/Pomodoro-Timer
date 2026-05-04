import {useState,useRef,useEffect} from 'react'
import './App.css'
import AudioPlayer from './AudioPlayer';
import AlarmButton from './Alarm';
import Alarm from './Alarm';





function App() {
  
  const intervalRef = useRef(null);
  const pomodoro = 1500;
  const short = 300;
  const long = 1800;
  let input= pomodoro;
  const[timeLeft, settimeLeft] = useState(input);
  
  function startTimer(){
 
  if (intervalRef.current) return; //prevents making extra interval if user hits start again.
  intervalRef.current = setInterval(() => { 
      settimeLeft((prevTimeLeft) => {
        if(prevTimeLeft<=0){
          clearInterval(intervalRef.current)
          intervalRef.current=null
          return 0
        }
        return prevTimeLeft - 1});
    }, 1000);
  }

  function stopTimer(){
  clearInterval(intervalRef.current)
  }

  function resetTimer(){
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    settimeLeft(pomodoro)
  }
  
  function shortBreak(){
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    settimeLeft(short);
  }

  function longBreak(){
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    settimeLeft(long);
  }

  function pomoTime(){
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    settimeLeft(pomodoro);
  }
  



  useEffect(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  document.title = `${minutes}:${seconds} - Pomodoro`;
  }, [timeLeft]);


  return (
    
    
    <div className="main">
      
      
      <video autoPlay muted loop playsInline className="background">
        <source src="/Pomodoro-Timer/videos/rainy-room.mp4" type="video/mp4" />
      </video>

      <h1 className='title'>Pomodoro Timer</h1>

        <div className="buttons">
          <button onClick= {pomoTime}>Pomodoro</button>
          <button onClick= {shortBreak}>Short Break</button>
          <button onClick= {longBreak}>Long Break</button>

        </div>

      <div className="timer">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, "0")}  </span>
        <span> <Alarm /> </span>
        
      </div>

   

      <div className="buttons">
          <button onClick= {startTimer}>Start</button>
          <button onClick= {stopTimer}>Pause</button>
          <button onClick= {resetTimer}>Reset</button>

        </div>

        <AudioPlayer/>
      


    </div>
  

);
}

export default App
