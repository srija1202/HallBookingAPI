// index.js

const express = require('express');
const app = express();

// Import routes
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Hall Booking API!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
