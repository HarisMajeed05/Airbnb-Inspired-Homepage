import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", {
                username,
                password,
            });
            alert(response.data.message);
            navigate(response.data.redirectPath);
        } catch (err) {
            alert(err.response.data.error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
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
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
