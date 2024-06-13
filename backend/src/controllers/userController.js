import { db } from '../database/db.js';

export const listUsers = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [results] = await db.query('SELECT * FROM predictions WHERE user_id = ?', [userId]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
