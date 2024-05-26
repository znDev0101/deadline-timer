import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Timer from "../components/Timer"

const Home = () => {
  const [duration, setDuration] = useState(0)
  const [uuid, setUuid] = useState("")
  const navigate = useNavigate()
  const ENDPOINT = "https://timer-api-henna.vercel.app/"

  const startTimer = async () => {
    try {
      const response = await axios.post(`${ENDPOINT}/api/timer`, { duration })
      setUuid(response.data.uuid)
      navigate(`/timer/${response.data.uuid}`)
    } catch (error) {
      console.error("Error creating timer:", error)
    }
  }

  return (
    <div>
      <Timer />
      <h1>Set a Timer</h1>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration in seconds"
      />
      <button onClick={startTimer}>Start Timer</button>
      {uuid && (
        <div>
          Share this link:{" "}
          <Link
            to={`/timer/${uuid}`}>{`${window.location.origin}/timer/${uuid}`}</Link>
        </div>
      )}
    </div>
  )
}

export default Home
