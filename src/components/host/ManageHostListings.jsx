import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Host/ManageHostListings.css';

const ManageListings = () => {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user role and listings
        fetchUserRole();
    }, []);

    const fetchUserRole = async () => {
        try {
            // Fetch current user details (assuming user info is stored in session or JWT)
            const userResponse = await axios.get('http://localhost:4000/current-user');
            const userId = userResponse.data.userId;

            // Fetch the role of the current user
            const roleResponse = await axios.get(`http://localhost:4000/api/user-role/${userId}`);
            const role = roleResponse.data.role;
            setCurrentUserRole(role);

            // If user is host, fetch their listings
            if (role === 'host') {
                fetchListings(userId);
            } else {
                setError('You must be a host to manage listings.');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            setError('Failed to fetch user role or listings.');
        }
    };

    const fetchListings = async (userId) => {
        try {
            const listingsResponse = await axios.get(`http://localhost:5000/api/listings/host/${userId}`);
            setListings(listingsResponse.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
            setError('Failed to fetch listings.');
        }
    };



    const handleDeleteListing = async (listingId) => {
        try {
            if (!listingId || listingId.length !== 24) {
                alert('Invalid listing ID');
                return;
            }

            await axios.delete(`http://localhost:5000/api/delete-listing/${listingId}`);
            setListings((prevListings) =>
                prevListings.filter((listing) => listing._id !== listingId)
            );
            alert('Listing deleted successfully!');
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Failed to delete listing.');
        }
    };

    return (
        <div className="manage-listings">
            <h2 className="page-title">Manage Your Listings</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="listing-cards">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <div key={listing._id} className="listing-card">
                            <img src={listing.image} alt={listing.title} className="listing-image" />
                            <div className="listing-details">
                                <h3 className="listing-title">{listing.title}</h3>
                                <p className="listing-type">{listing.type}</p>
                                <p className="listing-price">Price: ${listing.price}</p>
                                <p className="listing-guests">Guests: {listing.guests}</p>
                                <p className="listing-status">Status: {listing.status}</p>
                                <div className="listing-actions">
                                    <button 
                                        onClick={() => handleDeleteListing(listing._id)} 
                                        className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
            
        </div>
    );
};

export default ManageListings;
