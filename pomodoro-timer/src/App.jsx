import {useState,useRef,useEffect} from 'react'
import './App.css'




function App() {
  const[timeLeft, settimeLeft] = useState(1500);
  const intervalRef = useRef(null);

  
  function startTimer(){
 

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
    settimeLeft(1500)
  }

  useEffect(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  document.title = `${minutes}:${seconds} - Pomodoro`;
  }, [timeLeft]);


  return (
    
    
    <div className="main">
      

      <div className='settings'>
        <button></button>
      </div>

      <video autoPlay muted loop playsInline className="background">
        <source src="/videos/rainy-room.mp4" type="video/mp4" />
      </video>

      <h1 className='title'>Pomodoro Timer</h1>

      <div className="timer">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, "0")}</span>
      </div>

   

      <div className="buttons">
          <button onClick= {startTimer}>Start</button>
          <button onClick= {stopTimer}>Pause</button>
          <button onClick= {resetTimer}>Reset</button>

        </div>
      


    </div>
  

);
}

export default App
