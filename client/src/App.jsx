import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginSignUp from './Components/LoginSignUp/LoginSignUp'
import Register from './Components/Register/Register'
import Calendar from './Components/Calender'



function App() {
  const [sessionToken, setSessionToken] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
    console.log(sessionToken)
  }, [sessionToken])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const logoutUser = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      setSessionToken(undefined)
    }
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: sessionToken
        ? <Navigate to="/calendar" replace />
        : <LoginSignUp updateLocalStorage={updateLocalStorage}/>,
    },
    { path: "/register",
      element: sessionToken
        ?<Navigate to="/calendar" replace />
        :<Register updateLocalStorage={updateLocalStorage} />},
    {
      path: "/calendar",
      element: sessionToken
        ? <div>
          <button onClick={logoutUser} style={{ marginBottom: "10px"}} >
            Logout
          </button>
          <Calendar sessionToken={sessionToken} />
        </div>
        : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to={sessionToken ? "/calendar" : "/login"} replace />
    },
  ])

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}

export default App
