import React from "react"
import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Timer from "./components/Timer"
import Root from "./routes/Root"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/timer/:uuid",
      element: <Timer />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
