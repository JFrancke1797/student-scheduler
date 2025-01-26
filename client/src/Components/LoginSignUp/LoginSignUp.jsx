import { useState} from 'react'
import { Link } from 'react-router-dom'
import './loginSignUp.css'
import logo_icon from '../Assets/logo.png'

export default function LoginSignUp({ updateLocalStorage }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)
    // const [message, setMessage] = useState("")

    const toggle = () => {
        setLogin(!login);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        // setMessage("");
    }    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = login
            ? "http://127.0.0.1:4000/user-routes/login"
            : "http://127.0.0.1:4000/user-routes/register"

            const body = login
            ? { email, password }
            : { firstName, lastName, email, password }

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
            <div className="text">Login</div>
        </div>
        <form action="" onSubmit={handleSubmit} className="login-inputs">
            <div className="input">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="email" />
            </div>
            <div className="input">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="pwd" />
            </div>
            <div className="submit-container">
                <Link to="/register" type="submit" className="submit" onClick={toggle}>
                    Register
                </Link>
                <input type="submit" className="submit" onClick={handleSubmit} value="Login" />
            </div>
        </form>
        {/* {message && <p className="message">{message}</p>} */}
    </div>
    )
}
