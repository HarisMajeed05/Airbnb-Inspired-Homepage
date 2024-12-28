import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Function to log out the user
        const logoutUser = async () => {
            try {
                // Send logout request to the server
                const response = await fetch("http://localhost:4000/api/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message); // "User logged out successfully"

                    // Remove the token from local storage
                    localStorage.removeItem("authToken");

                    // Redirect to login page
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
