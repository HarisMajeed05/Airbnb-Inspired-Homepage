import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth/Login.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/register", {
                username,
                password,
            });
            alert(response.data.message);
            navigate(response.data.redirectPath); 
        } catch (err) {
            alert(err.response?.data?.error || "An error occurred during signup.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Signup</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleSignup} className="login-button">Signup</button>
            </div>
        </div>
    );
};

export default Signup;
