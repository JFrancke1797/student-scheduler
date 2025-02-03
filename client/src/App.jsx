import { useState, useEffect } from 'react'
import './App.css'
// import { browswe }
import LoginSignUp from './Components/LoginSignUp/LoginSignUp'
import Calendar from './Components/Calendar'

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

  const showLogoutBtn = () => !sessionToken ? null : (
    <button onClick={logoutUser}>Logout</button>
  )

  const handleView = () => {
    return !sessionToken
      ? <LoginSignUp updateLocalStorage={updateLocalStorage} />
      : <Calendar sessionToken={sessionToken} />
  }

  return (
    <>
    <div className="content">
      {showLogoutBtn()}
      {handleView()}
    {/* <LoginSignUp updateLocalStorage={updateLocalStorage} /> */}
    </ div>
    </>
  )
}

export default App
