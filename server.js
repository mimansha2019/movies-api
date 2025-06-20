const express = require('express');                 // Import Express
const mongoose = require('mongoose');               // Import Mongoose
const Movie = require('./models/Movie'); 
const cors = require('cors');           // Import Movie model

const app = express();                              // Create Express app
app.use(express.json());                           // Enable JSON parsing in request bodies

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],  // allow both
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));                        

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://mimanshasharma2019:mimansha2019@moviesdb.j9xak0h.mongodb.net/moviesDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));


// ROUTES

// GET all movies
app.get('/api/movies', async (req, res) => {
    try{
  const movies = await Movie.find();                // Fetch all movies from DB
  res.json(movies); } 
  catch (error) {
    console.error("GET /api/movies error:", error.message);
    res.status(500).json({ message: "Server error" });
  }                               // Send them as JSON
});

// GET movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try{
  const movie = await Movie.findById(req.params.id);
  res.json(movie);}
  catch (error) {
    console.error("GET /api/movies:id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Add new movie
app.post('/api/movies', async (req, res) => {
    console.log("📦 Received data:", req.body);
  try {
    const { title, director, releaseYear, genre } = req.body;

    // Validate input manually (optional but safe)
    if (!title || !director || !releaseYear || !genre) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure releaseYear is a number
    const year = parseInt(releaseYear);

    const newMovie = new Movie({
      title,
      director,
      releaseYear: year,
      genre
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);

  } catch (error) {
    console.error("🔥 POST error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});




// PUT: Update movie
app.put('/api/movies/:id', async (req, res) => {
    try{
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }                                   // Return the updated object
  );
  res.json(updatedMovie);}
  catch (error) {
    console.error("PUT /api/movies:id error:", error.message);
    res.status(500).json({ message: "Server error" });
  } 
});

// DELETE: Remove movie
app.delete('/api/movies/:id', async (req, res) => {
    try{
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });}
  catch (error) {
    console.error("DELETE /api/movies:id error:", error.message);
    res.status(500).json({ message: "Server error" });
  } 
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
