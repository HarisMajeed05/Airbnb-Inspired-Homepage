import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);

                    localStorage.removeItem("authToken");

                    navigate("/login");
                } else {
                    console.error("Failed to log out");
                }
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
