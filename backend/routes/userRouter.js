import express from 'express';
import { getUser, getUserById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getUser);
router.get('/:id', protect, getUserById)

export default router;