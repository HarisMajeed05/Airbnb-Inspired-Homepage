import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ListingDetails.css"; // Import the CSS file

const ListingDetails = ({ activeCategory }) => {
    const { id } = useParams(); // Get the id from the URL
    const [listing, setListing] = useState(null); // State to hold the listing details
    const [isBooked, setIsBooked] = useState(false); // State to track if the listing is booked
    const [error, setError] = useState(null); // State to handle errors
    const [loading, setLoading] = useState(true); // State to track loading state
    const navigate = useNavigate();
    const [currentUserRole, setCurrentUserRole] = useState('user'); // default to 'user'

    const checkRole = () => {
        axios.get('http://localhost:4000/current-user')
        .then((response) => {
            const userId = response.data.userId;
            // Fetch user details by ID to get the role
            axios.get(`http://localhost:4000/api/user-role/${userId}`)
                .then((roleResponse) => {
                    setCurrentUserRole(roleResponse.data.role); // Set the role
                })
                .catch((error) => {
                    console.error('Error fetching user role:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching current user:', error);
        });
    };

    useEffect(() => {
        checkRole();
        const fetchListingDetails = async () => {
            try {
                const category = typeof activeCategory === "string" ? activeCategory.toLowerCase() : "icons";

                // Fetch listing details
                const response = await fetch(`http://localhost:5000/api/${category}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch listings");
                }
                const data = await response.json();
                const foundListing = data.find((item) => item._id === id);

                if (foundListing) {
                    setListing(foundListing);

                    // Check if the listing is already booked
                    const bookingResponse = await fetch(`http://localhost:4000/api/${category}/${id}/is-booked`);
                    if (!bookingResponse.ok) {
                        throw new Error("Failed to check booking status");
                    }
                    const bookingData = await bookingResponse.json();
                    setIsBooked(bookingData.isBooked);
                } else {
                    setError("Listing not found");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListingDetails();
    }, [id, activeCategory]);

    const handleBookNow = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login to book this venue.");
            navigate("/login");
            return;
        }

        try {
            const category = typeof activeCategory === "string" ? activeCategory.toLowerCase() : "icons";

            const response = await fetch(`http://localhost:4000/api/bookings/${category}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setIsBooked(true); // Mark as booked after successful booking
            } else {
                alert(data.error || "Booking failed");
            }
        } catch (error) {
            alert("An error occurred while booking.");
            console.error("Booking Error:", error);
        }
    };

    if (loading) {
        return <p className="loading">Loading listing details...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!listing) {
        return <p className="error">Listing not found</p>;
    }

    return (
        <div className="listing-details-container">
            <h1 className="listing-title">{listing.title}</h1>
            <img className="listing-image" src={listing.image} alt={listing.title} />
            <p><span className="detail-label">Type:</span> {listing.type}</p>
            <p><span className="detail-label">Hosted by:</span> {listing.hostedby}</p>
            <p><span className="detail-label">Guests:</span> {listing.guests}</p>
            <p><span className="detail-label">Bedrooms:</span> {listing.bedrooms}</p>
            <p><span className="detail-label">Bathrooms:</span> {listing.bathrooms}</p>
            <p><span className="detail-label">Price:</span> {listing.price} {listing.status}</p>
            <p><span className="detail-label">Rating:</span> {listing.rating || "N/A"}</p>
            {currentUserRole === 'user' && (
                <button
                    className={`book-now-btn ${isBooked ? 'booked' : ''}`}
                    onClick={isBooked ? null : handleBookNow}
                    disabled={isBooked}
                >
                    {isBooked ? "Booked" : "Book Now"}
                </button>
            )}
        </div>
    );
};

export default ListingDetails;
