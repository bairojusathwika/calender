const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  //  dotenv to manage environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection string 
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/thinkMight';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
