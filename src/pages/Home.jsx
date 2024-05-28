// src/App.js
import React, { useState } from "react"
import { Link } from "react-router-dom"
// import Timer from "./Timer"

const App = () => {
  const [link, setLink] = useState("")

  const createTimer = async () => {
    const response = await fetch("http://localhost:3000/create-timer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deadline: new Date(Date.now() + 60000) }), // 1 minute timer for demo
    })
    const data = await response.json()
    setLink(data.link)
  }

  return (
    <div>
      <button onClick={createTimer}>Create Timer</button>
      {link && <Link to={`/${link}`}>Go to Timer</Link>}
    </div>
  )
}

export default App
