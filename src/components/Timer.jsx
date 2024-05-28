import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import { useParams, useNavigate } from "react-router-dom"

const socket = io("http://localhost:3000")

const Timer = () => {
  const { link } = useParams()
  const navigate = useNavigate()
  const [time, setTime] = useState(null)
  const [deadline, setDeadline] = useState("")

  useEffect(() => {
    if (link) {
      socket.emit("join", link)
      socket.on("timer", (deadline) => {
        setDeadline(deadline)
        setTime(new Date(deadline) - new Date())
      })
    }
  }, [link])

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1000)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [time])

  const startTimer = () => {
    const newDeadline = new Date(Date.now() + 60000) // 1 minute timer for demo
    socket.emit("start-timer", { link, deadline: newDeadline })
  }

  const resetTimer = () => {
    navigate("/")
  }

  return (
    <div>
      {time ? (
        <div>Time left: {Math.floor(time / 1000)} seconds</div>
      ) : (
        <div>Set a timer to start</div>
      )}
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
      <div>Shareable Link: {window.location.href}</div>
    </div>
  )
}

export default Timer
