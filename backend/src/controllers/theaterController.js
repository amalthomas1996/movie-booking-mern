const Theater = require('../../models/Theater');

// Create a new theater
exports.addTheater = async (req, res) => {
  try {
    const { name, location, amenities, totalSeats } = req.body;

    // Create new theater instance
    const newTheater = new Theater({
      name,
      location,
      amenities,
      totalSeats,
    });

    // Save theater to the database
    const savedTheater = await newTheater.save();

    // Send success response
    res.status(201).json({ message: 'Theater added successfully', theater: savedTheater });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error adding theater', error: error.message });
  }
};
// Get a theater by ID
exports.getTheaterById = async (req, res) => {
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
    const { id } = req.params;
    const { name, location, amenities, totalSeats } = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      id,
      { name, location, amenities, totalSeats },
      { new: true } // Return the updated document
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json(updatedTheater);
  } catch (error) {
    res.status(500).json({ message: "Failed to update theater", error });
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
