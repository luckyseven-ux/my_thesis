import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';

export const predict = async (req, res) => {
  const { inputData, name, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age } = req.body;
  const userId = req.user ? req.user.userId : 'default_user_id';
  const id_record = uuidv4(); // Generate a unique ID for the record

  try {
    // Kirim permintaan POST ke server Flask untuk mendapatkan prediksi
    const response = await axios.post('http://127.0.0.1:5000/predict', {
      input: inputData
    });

    const prediction = response.data.prediction;

    // Simpan hasil prediksi di database
    await db.query(
      'INSERT INTO record (id_record, name, outcome, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [id_record, name, JSON.stringify(prediction), pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, userId]
    );

    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ message: 'Error getting prediction', error: error.message });
  }
};
