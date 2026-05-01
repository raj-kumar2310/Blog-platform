import { Router } from 'express';
import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  deleteInappropriateComment,
  getAllPosts,
} from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard stats
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.put('/users/:userId/role', updateUserRole);

// Post management
router.get('/posts', getAllPosts);

// Comment moderation
router.delete('/comments/:commentId', deleteInappropriateComment);

export default router;
