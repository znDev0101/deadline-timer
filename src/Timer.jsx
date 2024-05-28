import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const Timer = ({ timerId, name, duration }) => {
  const [remainingTime, setRemainingTime] = useState(duration)

  useEffect(() => {
    const socket = io("http://localhost:3000")
    socket.on("timerUpdated", (id, time) => {
      if (id === timerId) {
        setRemainingTime(time)
      }
    })
    socket.on("timerExpired", (id) => {
      if (id === timerId) {
        console.log("Timer expired!")
      }
    })

    return () => socket.disconnect()
  }, [timerId])

  return (
    <div>
      <h2>{name}</h2>
      <p>{remainingTime} seconds remaining</p>
    </div>
  )
}

export default Timer
