import { db } from '../database/db.js';
import crypto from 'crypto';

export const addRecord = async (req, res) => {
  const { name, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, prediction } = req.body;
  const user_id = req.user.id;

  // Validasi input
  if (!name || !pregnancies || !glucose || !blood_pressure || !skin_thickness || !insulin || !bmi || !diabetes_pedigree_function || !age || !prediction) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const recordId = crypto.randomUUID().substring(0, 5);

    const query = `
      INSERT INTO record 
      (id_record, user_id, name, record_time, pregnancies, glucose, blood_preasure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, outcome) 
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      recordId, user_id, name, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, prediction
    ]);

    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};
