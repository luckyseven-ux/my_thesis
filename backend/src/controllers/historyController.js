import { db } from '../database/db.js';


export const getSessionHistory = async (req, res) => {
  try {
    const { username } = req.user; // Pastikan Anda menggunakan middleware autentikasi untuk menyetel req.user

    const [sessions] = await db.query('SELECT login_time, logout_time FROM user_sessions WHERE username = ?', [username]);

    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

export const getRecordHistory= async (req,res)=>{
  try{
    const {username} = req.user
    const {record} =await db.query('SELECT id, name, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, prediction, username,record_time FROM record WHERE username =?',[username])

    res.json({record})
  }catch(err){
    res.status(500).json({message :'Database Error',error:err.message})
  }
}