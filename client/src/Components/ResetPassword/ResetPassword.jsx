import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo_icon from '../Assets/logo.png'

export default function ResetPassword() {
    const [newpassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email;
    console.log("Email received in Reset Password:", email);  // Debugging log

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setMessage("Email is missing. Please restart the process.")
            return;
        }

        if(newpassword !== confirmPassword) {
            setMessage("Password does not match.")
        }

        

        try {
            const url = "http://127.0.0.1:4000/user-routes/reset-password"
            const body = { email, newpassword, confirmPassword }
            console.log("Sending request to backend:", body);

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })

            .then(res => {
                if (res.ok) {
                    setMessage("Password successfully reset! Redirecting to login...");
                    setTimeout(() => navigate("/login", { state: { email } }), 3000)
                } else {
                    setMessage(`Something went wrong: ${Error}`)
                }
                return res.json();
            })
            
            
        } catch (err) {
            setMessage(`Server error. Try again later: ${err}`)
            console.error(err.res)
            console.error(err.res.headers)
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <img className="header-img" src={logo_icon} alt="WebKIDSS Logo" />
                <div className="text">Enter New Password</div>
            </div>
            <form action="" onSubmit={handleSubmit} className="login-inputs">
                <div className="input">
                    <input
                    type="password"
                    placeholder="New password"
                    value={newpassword}
                    onChange={(event)=> setNewPassword(event.target.value)}
                    required
                    />
                </div>
                <div className="input">
                    <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(event)=> setConfirmPassword(event.target.value)}
                    required
                    />
                </div>
                <div className="submit-container">
                    <input type="submit" className="submit" value="Reset Password" onClick={handleSubmit} />
                </div>
            </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
    )
}
