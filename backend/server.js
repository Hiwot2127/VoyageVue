const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add JWT library

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Configuration (change the connection string as needed)
mongoose.connect('mongodb://localhost:27017/voyagevue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define User model
const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

app.use(bodyParser.json());

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token for authentication (if needed)
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ message: 'Registration failed.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate JWT token for authentication (if needed)
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Login failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
