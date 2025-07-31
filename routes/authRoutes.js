// This file defines the API endpoints for authentication.

import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
} from '../controllers/authController.js';

import {
  protect,
  authorizeRoles
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // Client removes token

// Protected route
router.get('/profile', protect, getUserProfile); // Requires token

export default router;
