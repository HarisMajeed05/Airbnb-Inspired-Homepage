import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ListingDetails = ({ activeCategory }) => {
    const { id } = useParams(); // Get the id from the URL
    const [listing, setListing] = useState(null); // State to hold the listing details
    const [isBooked, setIsBooked] = useState(false); // State to track if the listing is booked
    const [error, setError] = useState(null); // State to handle errors
    const [loading, setLoading] = useState(true); // State to track loading state
    const navigate = useNavigate();

    useEffect(() => {
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

            const response = await fetch(`http://localhost:4000/api/${category}/${id}`, {
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
        return <p>Loading listing details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!listing) {
        return <p>Listing not found</p>;
    }

    return (
        <div>
            <h1>{listing.title}</h1>
            <img src={listing.image} alt={listing.title} />
            <p>Type: {listing.type}</p>
            <p>Hosted by: {listing.hostedby}</p>
            <p>Guests: {listing.guests}</p>
            <p>Bedrooms: {listing.bedrooms}</p>
            <p>Bathrooms: {listing.bathrooms}</p>
            <p>Price: {listing.price} {listing.status}</p>
            <p>Rating: {listing.rating || "N/A"}</p>
            <button onClick={isBooked ? null : handleBookNow} disabled={isBooked}>
                {isBooked ? "Booked" : "Book Now"}
            </button>
        </div>
    );
};

export default ListingDetails;
