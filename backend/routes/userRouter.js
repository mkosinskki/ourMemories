import express from 'express';
import { getUser, getUserById, updateUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadAvatar } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/me', protect, getUser);
router.get('/:id', protect, authorize(1), getUserById)
router.put('/me', protect, uploadAvatar, updateUser);

export default router;