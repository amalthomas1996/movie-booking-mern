const Theater = require('../../models/Theater');

// Add a theater
exports.addTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Get a theater by ID
exports.getTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) return res.status(404).json({ message: 'Theater not found' });
    res.json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Update a theater by ID
exports.updateTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theater) return res.status(404).json({ message: 'Theater not found' });
    res.json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Delete a theater by ID
exports.deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) return res.status(404).json({ message: 'Theater not found' });
    res.json({ message: 'Theater deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};

// Get all theaters
exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message || 'An unknown error occurred' });
  }
};
