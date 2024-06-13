import express from 'express';
import { listUsers } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/predictions', authenticateJWT, listUsers);

export default router;
