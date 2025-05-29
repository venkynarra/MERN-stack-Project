const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load env vars from .env

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(cors());

// CORS Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Routes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Unknown route handler
app.use((req, res, next) => {
  console.log(' Unknown Route Hit:', req.method, req.originalUrl);
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connect to MongoDB and start server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bhbfxpw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('DB Connection Error:', err);
  });
