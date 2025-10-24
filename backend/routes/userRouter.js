import express from 'express';
import { getUser, addUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUser);
router.post('/', addUser);

// router.get('/', protect, getUser);
// router.post('/', protect, addUser);

export default router;