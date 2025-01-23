import { useState} from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import logo_icon from '../Assets/logo.png'

export default function LoginSignUp({ updateLocalStorage }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(true)
    const [message, SetMessage] = useState("")

    const toggle = () => {
        setRegister(!register);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        SetMessage("");
    }

    const handleSubmit = event => {
        event.preventDefault()

        const url = register
            ? "http://127.0.0.1:4000/user-routes/register"
            : "http://127.0.0.1:4000/user-routes/login"

            const body = register
            ? { firstName,lastName, email, password }
            : { email, password }

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
            <div className="text">Register</div>
        </div>
        <form action="" onSubmit={handleSubmit} className="login-inputs">
        <div className="input">
                <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" name="fName" placeholder="First Name" id="Fname" />                </div>
            <div className="input">
                <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" name="lName" placeholder="Last Name" id="Lname" />
            </div>
            <div className="input">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="email" />
            </div>
            <div className="input">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="pwd" />
            </div>
            <div className="submit-container">
                <div>
                    <p>Already have an Account?</p>
                    <Link to="/login" type="submit" className="submit" onClick={toggle}>
                        Login
                    </Link>
                </div>
                <input type="submit" className="submit" onClick={handleSubmit} value="Sign Up" />
            </div>
        </form>
        {message && <p className="message">{message}</p>}
    </div>
    )
}