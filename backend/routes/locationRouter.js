import express from 'express';
import { getAllLocations } from '../controllers/locationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize(1), getAllLocations);

export default router;