import express from 'express';
import { getAllLocations } from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllLocations);

// router.get('/', protect, getAllLocation);
export default router;