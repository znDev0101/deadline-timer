import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"

const Timer = () => {
  const { uuid } = useParams()
  const [timeLeft, setTimeLeft] = useState("00:00:00:00")
  const ENDPOINT = process.env.REACT_APP_API_URL
  const socket = io(ENDPOINT)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join_timer", uuid)

    socket.on("timer", ({ timeLeft }) => {
      setTimeLeft(timeLeft)
    })

    return () => {
      socket.disconnect()
    }
  }, [uuid])

  const handleNewPage = () => {
    navigate("/")
  }
  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>Time Left: {timeLeft}</div>
      <button onClick={handleNewPage}>New Page</button>
    </div>
  )
}

export default Timer
