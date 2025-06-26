// routes/studentRoutes.js
import express from 'express';
import { getStudentByRollNumber, bookRoom } from '../controllers/bookControllers.js';

const router = express.Router();

// Route to get student by roll number
router.get('/:rollNumber', getStudentByRollNumber);

// Route to book a room with roommates
router.post('/book', bookRoom);

export default router;