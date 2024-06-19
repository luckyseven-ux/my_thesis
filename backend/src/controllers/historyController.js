import { db } from '../database/db.js';

export const getSessionHistory = async (req, res) => {
    try {
      const userId = req.session.user.id;
  
      const [sessions] = await db.query('SELECT login_time, logout_time FROM user_sessions WHERE user_id = ?', [userId]);
  
      res.json({ sessions });
    } catch (err) {
      res.status(500).json({ message: 'Database error', error: err.message });
    }
  };