const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../models/User');
require('dotenv').config(); 

// JWT secret from .env file
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

// User login or registration (basic implementation)
const login = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Check if the user exists in the database
    let user = await User.findOne({ email });
    
    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({ email });
      await user.save();
    }
    
    // Create a token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// JWT middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = {
  login,
  verifyToken,
};
