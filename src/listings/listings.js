import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// Initialize the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/airbnbListings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// MongoDB native client for 'Icons' and 'TopCities' collections
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let database;

client.connect()
  .then(() => {
    database = client.db('airbnbListings');
    console.log('Connected to airbnb database');
  })
  .catch((err) => console.log('Error connecting to MongoDB client:', err));

// Route to get all Icons
app.get('/api/icons', async (req, res) => {
  try {
    const iconsCollection = database.collection('icons');
    const icons = await iconsCollection.find().toArray();
    res.json(icons);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get all TopCities
app.get('/api/topcities', async (req, res) => {
  try {
    const topCitiesCollection = database.collection('topcities');
    const topCities = await topCitiesCollection.find().toArray();
    res.json(topCities);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add listings (for initial data or testing)
app.post('/api/listings', async (req, res) => {
  try {
    const newListings = req.body;  // Expecting an array of listings
    const listingsCollection = database.collection('listings');
    await listingsCollection.insertMany(newListings);
    res.status(201).send('Listings saved');
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE route to remove a listing from a dynamic collection
app.delete('/api/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  try {
    // Ensure the category is valid before proceeding
    const validCategories = ['icons', 'topcities']; // Add other valid categories if needed
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Get the specific collection based on category
    const collection = database.collection(category.toLowerCase());

    // Delete the listing from the collection
    const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).send(err);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
