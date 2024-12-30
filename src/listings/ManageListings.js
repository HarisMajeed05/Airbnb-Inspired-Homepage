import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/airbnbListings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let database;

client.connect()
  .then(() => {
    database = client.db('airbnbListings');
    console.log('Connected to airbnb database');
  })
  .catch((err) => console.log('Error connecting to MongoDB client:', err));

app.get('/api/icons', async (req, res) => {
  try {
    const iconsCollection = database.collection('icons');
    const icons = await iconsCollection.find().toArray();
    res.json(icons);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/topcities', async (req, res) => {
  try {
    const topCitiesCollection = database.collection('topcities');
    const topCities = await topCitiesCollection.find().toArray();
    res.json(topCities);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/listings', async (req, res) => {
  try {
    const newListings = req.body;
    const listingsCollection = database.collection('listings');
    await listingsCollection.insertMany(newListings);
    res.status(201).send('Listings saved');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  try {
    const validCategories = ['icons', 'topcities'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const collection = database.collection(category.toLowerCase());

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
app.post('/api/add-listing/:category', async (req, res) => {
  const { category } = req.params;
  const newListing = req.body;

  try {
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    if (!collectionNames.includes(category.toLowerCase())) {
      return res.status(400).json({ error: `Collection ${category} does not exist` });
    }

    const collection = database.collection(category.toLowerCase());
    await collection.insertOne(newListing);
    console.log(`Inserted listing into ${category} collection`);

    res.status(201).json({ message: 'Listing added successfully!' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Failed to add listing' });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
