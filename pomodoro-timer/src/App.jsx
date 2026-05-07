import {useState,useRef,useEffect} from 'react'
import { forwardRef } from "react";
import './App.css'
import AudioPlayer from './AudioPlayer';
import ToDoList from './ToDoList';






function App() {
  
  const intervalRef = useRef(null);
  const alarmRef = useRef(null);
  const pomodoro = 1500; // 25 minutes
  const short = 300; // 5 minutes
  const long = 1800; // 30 minutes
  let input= pomodoro;
  const[timeLeft, settimeLeft] = useState(pomodoro);
  const [alarmOn, setAlarmOn] = useState(false);
  const rainRef = useRef(null);
  const [rainPlaying, setRainPlaying] = useState(false);


  //Timer related functions
  function startTimer(){
 
  if (intervalRef.current) return; //prevents making extra interval if user hits start again
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
  clearInterval(intervalRef.current) // Stops the interval
  intervalRef.current = null;  // says that there is currently not a timer running so line 22 doesn't freeze the entire app
                              // because you can't run 2 timer instances at the same time
  }

  function resetTimer(){
    clearInterval(intervalRef.current) 
    intervalRef.current = null;
    settimeLeft(pomodoro);
    stopAlarm();
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

  function rain() {
  if (rainRef.current) {
    if (rainPlaying) {
      rainRef.current.pause();
      rainRef.current.currentTime = 0;
      setRainPlaying(false);
    } else {
      rainRef.current.currentTime = 0;
      rainRef.current.volume = 0.5;
      rainRef.current.loop = true;
      rainRef.current.play();
      setRainPlaying(true);
    }
  }
}

  // effect for adding timer to tabs to allow users to alt tab and still see the timer. pretty cool right?
  useEffect(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  document.title = `${minutes}:${seconds} - Pomodoro`;
  }, [timeLeft]);


  //  Handles the alarm cuz apparentlly the interval of the timer messes with the alarm and audio player
  useEffect(() => {
  if (timeLeft === 0 && alarmOn && alarmRef.current) {
    alarmRef.current.loop = true;
    alarmRef.current.play();
    }
  }, [timeLeft, alarmOn]);
  

  function stopAlarm() {
  if (alarmRef.current) {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
    }
  }
  


return (

    
    <div className="main">
      
      
      <video autoPlay muted loop playsInline className="background">
        <source src="/Pomodoro-Timer/videos/rainy-room.mp4" type="video/mp4" />
      </video>
      
      <div className= 'rainbutton'>
        <button onClick={rain}> <img src={rainPlaying 
          ? "/Pomodoro-Timer/pictures/white-cloud.png" 
          : "/Pomodoro-Timer/pictures/black-cloud.png"} 
          alt="rain" 
        /></button>
      </div>

      <h1 className='title'>Rainy Pomo</h1>

        <div className="buttons">
          <button onClick= {pomoTime}>Pomodoro</button>
          <button onClick= {shortBreak}>Short Break</button>
          <button onClick= {longBreak}>Long Break</button>

        </div>

      <div className="timer">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, "0")}</span>

        <button onClick={() => {setAlarmOn(prev => {if (prev) stopAlarm();return !prev;});}}>Alarm: {alarmOn ? "ON 🔔" : "OFF"}</button>

        
      </div>

   

      <div className="buttons">
          <button onClick= {startTimer}>Start</button>
          <button onClick= {stopTimer}>Pause</button>
          <button onClick= {resetTimer}>Reset</button>

        </div>
        
        {/* Simple html5 audio player might replace later*/}
        <AudioPlayer/>
        <ToDoList/>

      <audio ref={alarmRef} src="/Pomodoro-Timer/audio/alarm.mp3" />
      <audio ref={rainRef} src="/Pomodoro-Timer/audio/rain.mp3" />


    </div>
  

);
}

export default App
