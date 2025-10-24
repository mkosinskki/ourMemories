import express from 'express';
import { addLocation, getLocation } from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLocation);
router.post('/', addLocation);

// router.get('/', protect, getLocation);
// router.post('/', protect, addLocation);

export default router;