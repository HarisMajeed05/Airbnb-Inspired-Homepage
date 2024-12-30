import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/User/MyProfile.css';

const MyProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/user/user-details", {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });
        setUserDetails(response.data);
        setFormData({
          username: response.data.username,
          role: response.data.role,
          password: '',
        });
      } catch (err) {
        setError("Error fetching user details");
        console.error(err); 
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedData = {
        username: formData.username,
        password: formData.password ? formData.password : undefined,
      };
  
      const token = localStorage.getItem("token");
  
      const response = await axios.put(
        "http://localhost:4000/api/user/update/user-details",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      setUserDetails(response.data);
      setEditing(false);
    } catch (err) {
      setError("Error updating profile");
      console.error(err);
    }
  };
  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userDetails) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {!editing ? (
        <>
          <p className="profile-detail"><strong>Username:</strong> {userDetails.username}</p>
          <p className="profile-detail"><strong>Role:</strong> {userDetails.role}</p>
          <h2 className="booked-venues-title">Booked Venues:</h2>
          {userDetails.bookedVenues.length === 0 ? (
            <p className="no-booking-message">No venues booked yet</p>
          ) : (
            <ul className="booked-venues-list">
              {userDetails.bookedVenues.map((venue, index) => (
                <li key={index} className="venue-item">
                  <strong>Category:</strong> {venue.category} <br />
                  <strong>Venue ID:</strong> {venue.venueId}
                </li>
              ))}
            </ul>
          )}
          {/* <button className="edit-button" onClick={() => setEditing(true)}>
            Edit Profile
          </button> */}
        </>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>Edit Profile</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password (Optional):</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
