import React, { useState } from "react"
import axios from "axios"

const CreateTimer = () => {
  const [name, setName] = useState("")
  const [duration, setDuration] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newTimer = {
      name,
      duration,
    }

    axios
      .post("/timers", newTimer)
      .then((response) => {
        console.log("Timer created!")
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Duration (seconds):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button type="submit">Create Timer</button>
    </form>
  )
}

export default CreateTimer
