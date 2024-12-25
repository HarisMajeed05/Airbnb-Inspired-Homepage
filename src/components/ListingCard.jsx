import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ListingCard.css';

const ListingCard = ({ activeCategory }) => {
    const [listings, setListings] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState('user'); // default to 'user'

    // Fetch the listing data based on the active category
    useEffect(() => {
        axios.get(`http://localhost:5000/api/${activeCategory}`)
            .then((response) => {
                setListings(response.data);
            })
            .catch((error) => {
                console.error('Error fetching listings:', error);
            });

        // Fetch current user's role
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
    }, [activeCategory]);

    const handleDelete = (listingId) => {
        const category = typeof activeCategory === "string" ? activeCategory.toLowerCase() : "icons";
        axios.delete(`http://localhost:5000/api/${category}/${listingId}`)
            .then(() => {
                setListings(listings.filter(listing => listing._id !== listingId));
            })
            .catch((error) => {
                console.error('Error deleting listing:', error);
            });
    };

    return (
        <div className="listing-section">
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <div className="listing-card" key={listing._id}>
                        <Link to={`/${activeCategory}/${listing._id}`}>
                            <img src={listing.image} alt={listing.title} />
                            <div className="listing-info">
                                <div className="title-rating">
                                    <h3>{listing.title}</h3>
                                    <p className="rating">{listing.rating}</p>
                                </div>
                                <p>{listing.distance}</p>
                                <p>{listing.duration}</p>
                                <p className="hostedby">{listing.hostedby}</p>
                                <p className="price">{listing.price} {listing.status}</p>
                            </div>
                        </Link>

                        {/* Show delete button only if the current user is an admin */}
                        {currentUserRole === 'admin' && (
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(listing._id)}
                            >
                                Delete Listing
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>Loading listings...</p>
            )}
        </div>
    );
};

ListingCard.propTypes = {
    activeCategory: PropTypes.string.isRequired,
};

export default ListingCard;
