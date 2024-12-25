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

// Global variable to store the current user's ID and timeout
let currentUserId = null;
let currentUserRole = 'user';
let sessionTimeout = null; // Timeout reference

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" } ,// Default role is 'user'
    bookedVenues: [{ category: String, venueId: String }]
});

const User = mongoose.model("User", userSchema);

// Predefined Admin Credentials
const predefinedAdmins = [
    { username: "admin1", password: "123" },
    { username: "admin2", password: "456" }
];

// Initialize Predefined Admins in Database
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
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            redirectPath: "/login"
        });
    } catch (err) {
        console.error(`Error registering user: ${username}`, err);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login
app.post("/login", async (req, res) => {
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

        // Set the global user ID and reset the session timeout
        currentUserId = user._id;
        currentUserRole = user.role; // Update the currentUserRole based on the user's role
        console.log("User logged in:", user._id);
        console.log("User logged in:", user.role);

        if (sessionTimeout) clearTimeout(sessionTimeout); // Clear previous timeout if any

        // Set a new timeout to clear user ID after 30 minutes (1800000 ms)
        sessionTimeout = setTimeout(() => {
            console.log("Session expired. Clearing user ID.");
            currentUserId = null;
            currentUserRole = 'user'; // Reset to default user role
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
            redirectPath: `/` // Redirect to user-specific page
        });
    } catch (err) {
        console.error(`Error logging in user: ${username}`, err);
        res.status(500).json({ error: "Error logging in" });
    }
});


// Logout
app.post("/logout", (req, res) => {
    // Clear the global user ID and timeout
    console.log("User logged out:", currentUserId);
    currentUserId = null;
    if (sessionTimeout) clearTimeout(sessionTimeout);
    res.json({ message: "User logged out successfully" });
});


// Route to handle booking a venue
// Route to handle booking a venue
app.post("/api/:category/:id", async (req, res) => {
    const { category, id } = req.params;

    if (!currentUserId) {
        return res.status(401).json({ error: "User not logged in" });
    }

    try {
        // Check if the venue is already booked by any user
        const bookedByUser = await User.findOne({
            "bookedVenues.category": category,
            "bookedVenues.venueId": id,
        });

        if (bookedByUser) {
            return res.status(400).json({ error: "Venue already booked by another user" });
        }

        // Add the new venue to the current user's bookedVenues
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
// Check if a venue is already booked
app.get("/api/:category/:id/is-booked", async (req, res) => {
    const { category, id } = req.params;

    try {
        // Find any user who has booked this venue
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
// Get user role by userId
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
// Check Current User
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
      res.json(true); // If the user ID is not null, return true
    } else {
      res.json(false); // If the user ID is null, return false
    }
  });
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
