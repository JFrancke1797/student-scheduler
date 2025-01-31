import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import logo_icon from '../Assets/logo.png'

export default function OTPvalidation() {
    const [otp, setOTP] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    console.log("Email received in OTP varify:", email);  // Debugging log

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = "http://127.0.0.1:4000/user-routes/otp-validation"
            const body = { email, otp }

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res => {
                if (res.ok) {
                    setMessage("OTP Verified! Redirecting...");
                    setTimeout(() => { navigate("/reset-password", { state: { email } }); }, 3000)
                } else {
                    setMessage("Invaild OTP!")
                }
                return res.json();
            })

        } catch (err) {
            setMessage(`Server error. Try again later: ${err}`)
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <img className="header-img" src={logo_icon} alt="WebKIDSS Logo" />
                <div className="text">OTP Verification</div>
            </div>
            <form action="" onSubmit={handleSubmit} className="login-inputs">
                <div className="input">
                    <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event)=> setOTP(event.target.value)}
                    required
                    />
                </div>
                <div className="submit-container">
                    <input  type="submit" className="submit" value="Submit OTP" onClick={handleSubmit} />
                </div>
            </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
    )
}
