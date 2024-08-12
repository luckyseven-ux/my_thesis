import express from 'express';
import { listUsers,register,login,logout,forgotPassword,resetPassword, Feedback, userProfileData } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/predictions', authenticateJWT, listUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout)
router.get('/check-token', authenticateJWT, (req, res) => {
    res.sendStatus(200); // Token is valid
  });
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/feedback',authenticateJWT, Feedback);
router.get('/profile',authenticateJWT, userProfileData);



export default router;
