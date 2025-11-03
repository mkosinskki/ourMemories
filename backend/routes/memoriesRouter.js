import express from 'express';
import { getMemories, addMemory } from '../controllers/memoriesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getMemories);
router.get('/', protect, authorize(1), getMemories);
router.post('/', protect, authorize(1), addMemory);

export default router;