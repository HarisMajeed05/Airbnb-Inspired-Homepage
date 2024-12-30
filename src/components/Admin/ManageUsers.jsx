import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Admin/ManageUsers.css'; 

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the server
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:4000/users'); 
            setUsers(response.data);
        } catch (err) {
            setError('Error fetching users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId)); 
        } catch (err) {
            alert('Error deleting user. Please try again.');
        }
    };
    // Delete a specific booking for a user
    const deleteBooking = async (userId, bookingId) => {
        try {
            await axios.delete(`http://localhost:4000/users/${userId}/bookings/${bookingId}`); 
            setUsers(users.map(user => {
                if (user._id === userId) {
                    return {
                        ...user,
                        bookedVenues: user.bookedVenues.filter(venue => venue._id !== bookingId),
                    };
                }
                return user;
            }));
        } catch (err) {
            alert('Error deleting booking. Please try again.');
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="manage-users">
            <h1>Manage Users</h1>
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Booked Venues</th>
                            <th>Delete Bookings</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(user => user.role === "guest") 
                            .map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.bookedVenues.map(venue => venue.category).join(', ')}/
                                        {user.bookedVenues.map(venue => venue.venueId).join(', ')}
                                    </td>
                                    <td>
                                        {user.bookedVenues.map(venue => (
                                            <div key={venue._id} className="booking-item">
                                                <span>{venue.category} - {venue.venueId}</span>
                                                <button
                                                    className="delete-booking-btn"
                                                    onClick={() => deleteBooking(user._id, venue._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default ManageUsers;
