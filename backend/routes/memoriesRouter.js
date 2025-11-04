import express from 'express';
import { getMemories, addMemory } from '../controllers/memoriesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadMemoryPhotos } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize(1), getMemories);
router.post('/', protect, authorize(1), uploadMemoryPhotos, addMemory);

export default router;