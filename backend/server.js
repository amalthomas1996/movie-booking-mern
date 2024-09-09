const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const theaterRoutes = require('./src/routes/theaterRoutes');
const showTimeRoutes = require('./src/routes/showTimeRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');


const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
//app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/showtimes', showTimeRoutes);
//app.use('/api/bookings', bookingRoutes);



// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure code
  }
};

// Start Server
const startServer = () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Run the database connection and server startup
if (process.env.MONGO_URI) {
  connectToDatabase().then(startServer);
} else {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1);
}
