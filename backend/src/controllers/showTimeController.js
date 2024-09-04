const Showtime = require('../../models/ShowTime');
const Theater = require('../../models/Theater');
const Movie = require('../../models/Movie');

// Add a new showtime
exports.addShowtime = async (req, res) => {
  try {
    const { theater, movie, showtime } = req.body;

    // Check if the same theater is already showing the same movie at the same time
    const existingShowtime = await Showtime.findOne({ theater, movie, showtime });
    if (existingShowtime) {
      return res.status(400).json({ message: 'This movie is already scheduled at this theater for the selected time.' });
    }

    // Create the new showtime
    const newShowtime = new Showtime({ theater, movie, showtime, seats: generateSeats(50) }); // Example: generate 50 seats
    await newShowtime.save();

    res.status(201).json({ message: 'Showtime created successfully', showtime: newShowtime });
  } catch (error) {
    res.status(500).json({ message: 'Error creating showtime', error });
  }
};

// Generate seats
const generateSeats = (count) => {
  const seats = [];
  for (let i = 1; i <= count; i++) {
    seats.push({ seatNumber: `A${i}`, isBooked: false });
  }
  return seats;
};

// Get all showtimes
exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate('theater movie');
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching showtimes', error });
  }
};

// Get showtime by ID
exports.getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate('theater movie');
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    res.status(200).json(showtime);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching showtime', error });
  }
};

// Delete a showtime
exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting showtime', error });
  }
};
