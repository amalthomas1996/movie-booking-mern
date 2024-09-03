const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Showtime = require('../../models/ShowTime');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { user, showtime, seats, status, paymentInfo } = req.body;

    // Validate user and showtime
    const existingUser = await User.findById(user);
    const existingShowtime = await Showtime.findById(showtime);

    if (!existingUser) return res.status(404).json({ message: 'User not found' });
    if (!existingShowtime) return res.status(404).json({ message: 'Showtime not found' });

    // Create a new booking
    const newBooking = new Booking({
      user,
      showtime,
      seats,
      status,
      paymentInfo,
      bookingDate: new Date()
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('showtime');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const { user, showtime, seats, status, paymentInfo } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { user, showtime, seats, status, paymentInfo },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('showtime');
    res.json(bookings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
