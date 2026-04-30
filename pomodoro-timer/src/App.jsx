import { useState } from 'react'
import './App.css'


function App() {
  return (
    
    <div className="main">

      <div className='settings'>
        <button></button>
      </div>

      <video autoPlay muted loop playsInline className="background">
        <source src="/videos/rainy-room.mp4" type="video/mp4" />
      </video>

      <h1 className='title'>Pomodoro Timer</h1>

      <div className="timer">25:00</div>

      <div className="buttons">
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => setIsRunning(false)}>Pause</button>
          <button onClick={() => {setIsRunning(false); setTime(1500);}}>Reset</button>

        </div>
      


    </div>
  

);
}

export default App
