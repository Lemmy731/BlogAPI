const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the user model

const userRegister = express.Router();

// Route for user registration
userRegister.post('/register', async (req, res) => {
  try {
    
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRegister;
