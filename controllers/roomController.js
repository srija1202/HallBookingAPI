// controllers/roomController.js

const dataStore = require('../data/dataStore');

/**
 * @desc    Create a new room
 * @route   POST /api/rooms
 * @access  Public
 */
exports.createRoom = (req, res) => {
  const { roomName, seatsAvailable, amenities, pricePerHour } = req.body;

  // Validate request body
  if (!roomName || !seatsAvailable || !amenities || !pricePerHour) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create new room object
  const newRoom = {
    roomId: dataStore.roomIdCounter++,
    roomName,
    seatsAvailable,
    amenities,
    pricePerHour,
  };

  // Add new room to data store
  dataStore.rooms.push(newRoom);

  return res.status(201).json({
    message: 'Room created successfully.',
    room: newRoom,
  });
};

/**
 * @desc    Get all rooms with booking data
 * @route   GET /api/rooms
 * @access  Public
 */
exports.getAllRooms = (req, res) => {
  const roomsWithBookings = dataStore.rooms.map((room) => {
    // Find bookings for this room
    const bookings = dataStore.bookings
      .filter((booking) => booking.roomId === room.roomId)
      .map((booking) => ({
        customerName: booking.customerName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.bookingId,
        bookingDate: booking.bookingDate,
        bookingStatus: booking.bookingStatus,
      }));

    return {
      ...room,
      bookings: bookings.length > 0 ? bookings : 'No bookings for this room.',
    };
  });

  return res.status(200).json(roomsWithBookings);
};
