const express = require('express');
const router = express.Router();
const Availability = require('../schema/Availability');
const { verifyToken } = require('../middleware/auth');

// Add Availability
router.post('/availability', verifyToken, async (req, res) => {
  const { dayOfWeek, intervals } = req.body;
  try {
    const availability = new Availability({
      userId: req.user.id,
      dayOfWeek,
      intervals
    });
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Error saving availability' });
  }
});

// Update Availability
router.put('/availability/:id', verifyToken, async (req, res) => {
  const { intervals } = req.body;
  try {
    const availability = await Availability.findByIdAndUpdate(
      req.params.id,
      { intervals },
      { new: true }
    );
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Error updating availability' });
  }
});

// Delete Availability
router.delete('/availability/:id', verifyToken, async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Availability deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting availability' });
  }
});

module.exports = router;
