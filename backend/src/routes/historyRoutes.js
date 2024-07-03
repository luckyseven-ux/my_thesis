import express from 'express';
import { getRecordHistory, getSessionHistory } from '../controllers/historyController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/record',authenticateJWT,getRecordHistory)
router.get('/sessions', authenticateJWT, getSessionHistory);

export default router;
