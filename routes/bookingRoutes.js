// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// @route   POST /api/bookings
// @desc    Book a room
router.post('/', bookingController.bookRoom);

// @route   GET /api/bookings/customers
// @desc    Get all customers with booking data
router.get('/customers', bookingController.getAllCustomers);

// @route   GET /api/bookings/count
// @desc    Get number of times a customer has booked a room
router.get('/count', bookingController.getCustomerBookingCount);

module.exports = router;
