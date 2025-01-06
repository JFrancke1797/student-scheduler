import React, { useState} from 'react'
import './loginSignUp.css'

import logo_icon from '../Assets/logo.png'

export default function LoginSignUp() {

    const [action, setAction] = useState("Login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [login, setLogin] = useState(true)

    const handleSubmit = event => {
        event.preventDefault()

        const url = login
            ? "http://127.0.0.1:4000/auth/login"
            : "http://127.0.0.1:4000/auth/register"

            const body = login
            ? { email, password }
            : { fullName, age, email, password }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(res => res.json())
            .then(data => updateLocalStorage(data.token))
    } 

    return ( 
    <div className="login-container">
        <div className="header">
            <img className="header-img" src={logo_icon} alt="WebKIDSS Logo" />
            <div className="text">{action}</div>
        </div>
        <form action="" onSubmit={handleSubmit} className="login-inputs">
            {action==="Login"?<div></div>:
                <>
                    <div className="input">
                        <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" placeholder="First Name" id="Fname" />
                    </div>
                    <div className="input">
                        <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" placeholder="Last Name" id="Lname" />
                    </div>
                </>
            }
            <div className="input">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="email" />
            </div>
            <div className="input">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="pwd" />
            </div>
            <div className="submit-container">
                <input type="submit" className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Register")}} value="Register" />
                <input type="submit" className={action==="Register"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} value="Login" />
            </div>
        </form>
    </div>
    )
}
