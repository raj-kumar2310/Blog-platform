import { Router } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  bookmarkPost,
} from '../controllers/blogController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPost);

// Protected routes
router.post('/', authMiddleware, createPost);
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);

// Like and bookmark
router.post('/:postId/like', authMiddleware, likePost);
router.post('/:postId/bookmark', authMiddleware, bookmarkPost);

export default router;
