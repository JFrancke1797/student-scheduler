import { useState} from 'react'
import './loginSignUp.css'

import logo_icon from '../Assets/logo.png'

export default function LoginSignUp({ updateLocalStorage }) {

    const [action, setAction] = useState("Login")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)
    const [message, SetMessage] = useState("")

    const toggle = () => {
        setLogin(!login);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        SetMessage("");
    }

    const toggleBtn = () => (login ? "Register" : "Login");

    const register = () => login ? null : (
        <>
            <div className="input">
                <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" name="fName" placeholder="First Name" id="Fname" />                </div>
            <div className="input">
                <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" name="lName" placeholder="Last Name" id="Lname" />
            </div>
        </>
    )

    const handleSubmit = event => {
        event.preventDefault()

        const url = login
            ? "http://127.0.0.1:4000/user/login"
            : "http://127.0.0.1:4000/user/register"

            const body = login
            ? { email, password }
            : { firstName,lastName, email, password }

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
            <div className="text">{login ? "Login" : "Register"}</div>
        </div>
        <form action="" onSubmit={handleSubmit} className="login-inputs">
            {register()}
            <div className="input">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="email" />
            </div>
            <div className="input">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="pwd" />
            </div>
            <div className="submit-container">
                <input type="submit" className={action==="Login"?"gray":"submit"} id="toggle" onClick={toggle} value={toggleBtn()} />
                <input type="submit" className={action==="Register"?"gray":"submit"} onClick={handleSubmit} value={login ? "Login" : "Sign Up"} />
            </div>
        </form>
        {message && <p className="message">{message}</p>}
    </div>
    )
}
