const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes and middleware here
// ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
