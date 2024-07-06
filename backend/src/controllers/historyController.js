import { db } from '../database/db.js';


export const getSessionHistory = async (req, res) => {
  try {
    const { username } = req.user; // Pastikan Anda menggunakan middleware autentikasi untuk menyetel req.user
    console.log('User ID:', username);
    const [sessions] = await db.query('SELECT login_time, logout_time FROM user_sessions WHERE username = ?', [username]);
    
    res.json({sessions  });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};


export const getRecordHistory = async (req, res) => {
  try {
    const { id } = req.user;
    console.log('User ID:', id); // Tambahkan log ini
    const [records] = await db.query('SELECT id_record, name, pregnancies, glucose, blood_preasure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, outcome, record_time FROM record WHERE user_id = ?', [id]);
    console.log('Sending records:', records); // Tambahkan log ini
    res.json({ records });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database Error', error: err.message });
  }
};
