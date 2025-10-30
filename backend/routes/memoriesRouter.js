import express from 'express';
import { getMemories, addMemory } from '../controllers/memoriesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', getMemories);
router.get('/', protect, getMemories);
router.post('/', protect, addMemory);

export default router;