// routes/roomRoutes.js

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// @route   POST /api/rooms
// @desc    Create a new room
router.post('/', roomController.createRoom);

// @route   GET /api/rooms
// @desc    Get all rooms with booking data
router.get('/', roomController.getAllRooms);

module.exports = router;
