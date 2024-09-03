const ShowTime = require('../../models/ShowTime');

// Add a showtime
exports.addShowTime = async (req, res) => {
  try {
    const showTime = new ShowTime(req.body);
    await showTime.save();
    res.status(201).json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Get a showtime by ID
exports.getShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.findById(req.params.id);
    if (!showTime) return res.status(404).json({ message: 'ShowTime not found' });
    res.json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Update a showtime by ID
exports.updateShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showTime) return res.status(404).json({ message: 'ShowTime not found' });
    res.json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Delete a showtime by ID
exports.deleteShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.findByIdAndDelete(req.params.id);
    if (!showTime) return res.status(404).json({ message: 'ShowTime not found' });
    res.json({ message: 'ShowTime deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Get all showtimes
exports.getAllShowTimes = async (req, res) => {
  try {
    const showTimes = await ShowTime.find();
    res.json(showTimes);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};
