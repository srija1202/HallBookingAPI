Hall Booking API 

1. Create a Room
Endpoint: POST /api/rooms

Description: Creates a new room with specified details.
Request Body: 
{
  "roomName": "Conference Room A",
  "seatsAvailable": 50,
  "amenities": ["Projector", "Whiteboard", "AC"],
  "pricePerHour": 2000
}

Success Response:

Status: 201 Created

Body:
{
  "message": "Room created successfully.",
  "room": {
    "roomId": 1,
    "roomName": "Conference Room A",
    "seatsAvailable": 50,
    "amenities": ["Projector", "Whiteboard", "AC"],
    "pricePerHour": 2000
  }
}

2. Book a Room
Endpoint: POST /api/bookings

Description: Books a room for a customer at a specified date and time.

Request Body:
{
  "customerName": "John Doe",
  "date": "2024-08-30",
  "startTime": "10:00",
  "endTime": "12:00",
  "roomId": 1
}

Error Response (if double booked):

Status: 400 Bad Request

Body:
{
  "message": "Room is already booked for the selected time slot."
}

Get All Rooms with Booking Data
Endpoint: GET /api/rooms
Description: Retrieves all rooms along with their booking information.
Success Response:
Status: 200 OK

Body:
[
  {
    "roomId": 1,
    "roomName": "Conference Room A",
    "seatsAvailable": 50,
    "amenities": ["Projector", "Whiteboard", "AC"],
    "pricePerHour": 2000,
    "bookings": [
      {
        "customerName": "John Doe",
        "date": "2024-08-30",
        "startTime": "10:00",
        "endTime": "12:00",
        "bookingId": 1,
        "bookingDate": "2023-08-25T12:00:00.000Z",
        "bookingStatus": "Confirmed"
      }
    ]
  }
]

4. Get All Customers with Booking Data
Endpoint: GET /api/bookings/customers
Description: Retrieves all customers along with their booking information.
Success Response:
Status: 200 OK

Body:
[
  {
    "customerName": "John Doe",
    "roomName": "Conference Room A",
    "date": "2024-08-30",
    "startTime": "10:00",
    "endTime": "12:00",
    "bookingId": 1,
    "bookingDate": "2023-08-25T12:00:00.000Z",
    "bookingStatus": "Confirmed"
  }
]

5. Get Number of Times a Customer has Booked a Room
Endpoint: GET /api/bookings/count

Description: Retrieves the count and details of bookings made by a specific customer for a specific room.

Query Parameters:

customerName (string, required): Name of the customer.
roomName (string, required): Name of the room.
Example Request:

GET /api/bookings/count?customerName=John Doe&roomName=Conference Room A

Success Response:

Status: 200 OK

Body:

{
    "customerName": "John Doe",
    "roomName": "Conference Room A",
    "bookingCount": 2,
    "bookings": [
        {
            "bookingId": 1,
            "customerName": "John Doe",
            "date": "2024-08-30",
            "startTime": "10:00",
            "endTime": "12:00",
            "roomId": 1,
            "roomName": "Conference Room A",
            "bookingDate": "2024-08-25T09:14:03.513Z",
            "bookingStatus": "Confirmed"
        },
        {
            "bookingId": 2,
            "customerName": "John Doe",
            "date": "2024-08-30",
            "startTime": "12:00",
            "endTime": "12:30",
            "roomId": 1,
            "roomName": "Conference Room A",
            "bookingDate": "2024-08-25T09:16:45.918Z",
            "bookingStatus": "Confirmed"
        }
    ]
}

Error Response (if parameters missing):

Status: 400 Bad Request

Body:

{
  "message": "customerName and roomName are required."
}


PostMan Doc :- 