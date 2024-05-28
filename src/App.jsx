import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [timer, setTimer] = useState({
    duration: 25 * 60,
    startTime: null,
    isRunning: false,
  })
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    fetchTimer()
    const id = setInterval(fetchTimer, 1000)
    setIntervalId(id)
    return () => clearInterval(id)
  }, [])

  const fetchTimer = async () => {
    const response = await axios.get("http://localhost:3000/timer")
    setTimer(response.data)
  }

  const startTimer = async () => {
    await axios.post("http://localhost:3000/timer/start")
    fetchTimer()
  }

  const stopTimer = async () => {
    await axios.post("http://localhost:3000/timer/stop")
    fetchTimer()
  }

  const getRemainingTime = () => {
    if (!timer.isRunning || !timer.startTime) return timer.duration
    const elapsedTime = Math.floor(
      (new Date() - new Date(timer.startTime)) / 1000
    )
    return Math.max(timer.duration - elapsedTime, 0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="App">
      <h1>Shared Pomodoro Timer</h1>
      <div id="timer">{formatTime(getRemainingTime())}</div>
      <button onClick={startTimer} disabled={timer.isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!timer.isRunning}>
        Stop
      </button>
    </div>
  )
}

export default App
