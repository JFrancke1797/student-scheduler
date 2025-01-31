import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo_icon from '../Assets/logo.png'

export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = "http://127.0.0.1:4000/user-routes/forgot-password"
            const body = { email }

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res => {
                if (res.ok) {
                    setMessage("OTP sent! Check your email.");
                    setTimeout(() => { navigate("/otp-validation", { state: { email } }); }, 3000)
                } else {
                    setMessage("Invalid email!")
                }
                return res.json();
            })
        } catch (err) {
            setMessage(`Error ${err}`)
            console.error(`Server error. Try again: ${err}`)
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                <img className="header-img" src={logo_icon} alt="WebKIDSS Logo" />
                <div className="text">Forgot Password</div>
            </div>
            <form action="" onSubmit={handleSubmit} className="login-inputs">
                <div className="input">
                    <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                    required
                    />
                </div>
                <div className="submit-container">
                    <input type="submit" className="submit" value="Send OTP" onClick={handleSubmit} />
                </div>
            </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
    )
};