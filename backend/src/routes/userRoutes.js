import express from 'express';
import { listUsers,register,login,logout,forgotPassword,resetPassword } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';
import { getSessionHistory } from '../controllers/historyController.js';
const router = express.Router();

router.get('/predictions', authenticateJWT, listUsers);
router.get('/history', getSessionHistory);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


export default router;
