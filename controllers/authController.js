// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for admin credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
      return res.json({ success: true, role: 'admin', token });
    }
    
    // Check for regular user
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      res.json({ success: true, role: user.role, token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};