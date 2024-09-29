// routes/studentRoutes.js
const express = require('express');
const { getStudentByRollNumber, bookRoom } = require('../controllers/bookControllers');

const router = express.Router();

// Route to get student by roll number
router.get('/:rollNumber', getStudentByRollNumber);

// Route to book a room with roommates
router.post('/book', bookRoom);

module.exports = router;