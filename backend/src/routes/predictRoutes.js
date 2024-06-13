import express from 'express';
import { predict } from '../controllers/predictController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/predict', authenticateJWT),predict;

export default router;
