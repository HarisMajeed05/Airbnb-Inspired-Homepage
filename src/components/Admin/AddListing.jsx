import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin/AddListing.css'; // Add custom styles here if needed

const AddListing = ({ activeCategory }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        image: '',
        title: '',
        type: '',
        distance: '',
        duration: '',
        hostedby: '',
        guests: '',
        bedrooms: '',
        bathrooms: '',
        price: '',
        status: '',
        rating: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.image) {
            setError('Title and image are required.');
            return;
        }

        axios.post(`http://localhost:5000/api/add-listing/${activeCategory}`, formData)
            .then(() => {
                alert('Listing added successfully!');
                navigate('/'); // Redirect to home or listings page after successful addition
            })
            .catch((err) => {
                console.error('Error adding listing:', err);
                setError('Failed to add listing. Please try again.');
            });
    };

    return (
        <div className="add-listing-form">
            <h2>Add New Listing</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Distance:
                    <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Duration:
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Hosted By:
                    <input
                        type="text"
                        name="hostedby"
                        value={formData.hostedby}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Guests:
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bedrooms:
                    <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bathrooms:
                    <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Rating:
                    <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className="submit-button">Add Listing</button>
            </form>
        </div>
    );
};

AddListing.propTypes = {
    activeCategory: PropTypes.string.isRequired,
};

export default AddListing;
