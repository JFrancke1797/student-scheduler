import { useState, useEffect } from 'react'
import './App.css'
// import { browswe }
import LoginSignUp from './Components/LoginSignUp/LoginSignUp'
import Calender from './Components/Calender'
import { Button, createTheme, ThemeProvider } from '@mui/material'

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
    <Button variant='contained' onClick={logoutUser}>Logout</Button>
  )

  const handleView = () => {
    return !sessionToken
      ? <LoginSignUp updateLocalStorage={updateLocalStorage} />
      : <Calender sessionToken={sessionToken} />
  }

  
  const theme = createTheme({
    palette:{
      primary:{
        main: '#dee8f7'
      }
    }
  })

  return (
    <>
    <ThemeProvider theme={theme}>

    <div className="content">
      {showLogoutBtn()}
      {handleView()}
    {/* <LoginSignUp updateLocalStorage={updateLocalStorage} /> */}
    </ div>
    </ThemeProvider>
    </>
  )
}

export default App
