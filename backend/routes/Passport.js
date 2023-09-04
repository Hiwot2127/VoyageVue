const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Registration route
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate the request data (you may want to add more validation)
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email is already registered
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Create a new user record in MongoDB
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login route
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/', // Redirect to the home page on successful login
    failureRedirect: '/login', // Redirect back to the login page on failed login
  })
);

module.exports = router;
