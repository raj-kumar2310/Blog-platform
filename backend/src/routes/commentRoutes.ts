import { Router } from 'express';
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public route to get comments
router.get('/:postId', getComments);

// Protected routes
router.post('/:postId', authMiddleware, createComment);
router.put('/:commentId', authMiddleware, updateComment);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
