// controllers/bookingController.js

const dataStore = require('../data/dataStore');

/**
 * @desc    Book a room
 * @route   POST /api/bookings
 * @access  Public
 */
exports.bookRoom = (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Validate request body
  if (!customerName || !date || !startTime || !endTime || !roomId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if room exists
  const room = dataStore.rooms.find((r) => r.roomId === roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found.' });
  }

  // Check for double booking
  const isDoubleBooked = dataStore.bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime))
  );

  if (isDoubleBooked) {
    return res
      .status(400)
      .json({ message: 'Room is already booked for the selected time slot.' });
  }

  // Create new booking object
  const newBooking = {
    bookingId: dataStore.bookingIdCounter++,
    customerName,
    date,
    startTime,
    endTime,
    roomId,
    roomName: room.roomName,
    bookingDate: new Date().toISOString(),
    bookingStatus: 'Confirmed',
  };

  // Add new booking to data store
  dataStore.bookings.push(newBooking);

  return res.status(201).json({
    message: 'Room booked successfully.',
    booking: newBooking,
  });
};

/**
 * @desc    Get all customers with booking data
 * @route   GET /api/bookings/customers
 * @access  Public
 */
exports.getAllCustomers = (req, res) => {
  const customers = dataStore.bookings.map((booking) => ({
    customerName: booking.customerName,
    roomName: booking.roomName,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    bookingId: booking.bookingId,
    bookingDate: booking.bookingDate,
    bookingStatus: booking.bookingStatus,
  }));

  if (customers.length === 0) {
    return res.status(200).json({ message: 'No bookings found.' });
  }

  return res.status(200).json(customers);
};

/**
 * @desc    Get booking count for a customer in a room
 * @route   GET /api/bookings/count
 * @access  Public
 */
exports.getCustomerBookingCount = (req, res) => {
  const { customerName, roomName } = req.query;

  // Validate query parameters
  if (!customerName || !roomName) {
    return res
      .status(400)
      .json({ message: 'customerName and roomName are required.' });
  }

  // Find bookings matching customer and room
  const customerBookings = dataStore.bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase() === customerName.toLowerCase() &&
      booking.roomName.toLowerCase() === roomName.toLowerCase()
  );

  if (customerBookings.length === 0) {
    return res.status(200).json({
      message: `${customerName} has not booked ${roomName} yet.`,
      bookingCount: 0,
    });
  }

  return res.status(200).json({
    customerName,
    roomName,
    bookingCount: customerBookings.length,
    bookings: customerBookings,
  });
};
