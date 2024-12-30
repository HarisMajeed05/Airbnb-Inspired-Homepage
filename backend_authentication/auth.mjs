import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

let currentUserId = null;
let currentUserRole = 'user';
let sessionTimeout = null;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    bookedVenues: [{ category: String, venueId: String }]
});

const User = mongoose.model("User", userSchema);

const predefinedAdmins = [
    { username: "admin1", password: "123" },
    { username: "admin2", password: "456" }
];

(async () => {
    for (const admin of predefinedAdmins) {
        const existingAdmin = await User.findOne({ username: admin.username });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            const newAdmin = new User({ username: admin.username, password: hashedPassword, role: "admin" });
            await newAdmin.save();
            console.log(`Admin ${admin.username} created`);
        }
    }
})();

// Signup
app.post("/api/auth/register", async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Validate the role
        if (!['host', 'guest'].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Must be 'host' or 'guest'." });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            redirectPath: "/login",
        });
    } catch (err) {
        console.error(`Error registering user: ${username}`, err);
        res.status(500).json({ error: "Error registering user" });
    }
});


// Login
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        currentUserId = user._id;
        currentUserRole = user.role;
        console.log("User logged in:", user._id);
        console.log("User logged in:", user.role);

        if (sessionTimeout) clearTimeout(sessionTimeout);

        sessionTimeout = setTimeout(() => {
            console.log("Session expired. Clearing user ID.");
            currentUserId = null;
            currentUserRole = 'user';
        }, 1800000);

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            role: user.role,
            redirectPath: `/`
        });
    } catch (err) {
        console.error(`Error logging in user: ${username}`, err);
        res.status(500).json({ error: "Error logging in" });
    }
});


app.post("/api/auth/logout", (req, res) => {
    console.log("User logged out:", currentUserId);
    currentUserId = null;
    if (sessionTimeout) clearTimeout(sessionTimeout);
    res.json({ message: "User logged out successfully" });
});


// Route to handle booking a venue
app.post("/api/bookings/:category/:id", async (req, res) => {
    const { category, id } = req.params;

    if (!currentUserId) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        const bookedByUser = await User.findOne({
            "bookedVenues.category": category,
            "bookedVenues.venueId": id,
        });

        if (bookedByUser) {
            return res.status(400).json({ error: "Venue already booked by another user" });
        }

        const user = await User.findById(currentUserId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.bookedVenues.push({ category, venueId: id });
        await user.save();

        res.status(200).json({ message: "Venue booked successfully" });
    } catch (err) {
        console.error("Error booking venue:", err);
        res.status(500).json({ error: "Error booking venue" });
    }
});
app.get("/api/:category/:id/is-booked", async (req, res) => {
    const { category, id } = req.params;

    try {
        const bookedByUser = await User.findOne({
            "bookedVenues.category": category,
            "bookedVenues.venueId": id,
        });

        if (bookedByUser) {
            return res.status(200).json({ isBooked: true, userId: bookedByUser._id });
        } else {
            return res.status(200).json({ isBooked: false });
        }
    } catch (err) {
        console.error("Error checking venue booking status:", err);
        res.status(500).json({ error: "Error checking booking status" });
    }
});
app.get("/api/user-role/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ role: user.role });
    } catch (err) {
        console.error("Error fetching user role:", err);
        res.status(500).json({ error: "Error fetching user role" });
    }
});
app.get("/current-user", (req, res) => {
    if (currentUserId) {
        console.log(currentUserId);
        res.json({ userId: currentUserId });
    } else {
        res.status(401).json({ error: "No user logged in" });
    }
});
app.get('/checkStatus', (req, res) => {
    if (currentUserId) {
        res.json(true);
    } else {
        res.json(false);
    }
});
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send('User deleted');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});
app.delete('/users/:userId/bookings/:bookingId', async (req, res) => {
    const { userId, bookingId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedVenues = user.bookedVenues.filter(venue => venue._id.toString() !== bookingId);
        if (updatedVenues.length === user.bookedVenues.length) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        user.bookedVenues = updatedVenues;
        await user.save();

        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        console.error("Error deleting booking:", err);
        res.status(500).json({ error: 'Error deleting booking' });
    }
});
// Fetch the details of the current logged-in user
app.get('/api/user/user-details', async (req, res) => {
    if (!currentUserId) {
        return res.status(401).json({ error: "No user logged in" });
    }

    try {
        const user = await User.findById(currentUserId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            username: user.username,
            role: user.role,
            bookedVenues: user.bookedVenues
        });
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({ error: "Error fetching user details" });
    }
});
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  };
  

app.put('/api/user/update/user-details', authenticate, async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const { username, password } = req.body;
console.log(username);
console.log(password);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (username) user.username = username;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.json({
            username: user.username,
            role: user.role,
            bookedVenues: user.bookedVenues
        });
    } catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).json({ error: "Error updating user details" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
