import { db } from '../database/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'


export const listUsers = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [results] = await db.query('SELECT * FROM predictions WHERE user_id = ?', [userId]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const register = async (req, res) => {
  const { username, email, password, retype_password } = req.body;

  // Validasi password dan retype_password
  if (password !== retype_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const [existingUser] = await db.query('SELECT * FROM login WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat ID unik dengan panjang 5 karakter menggunakan crypto.randomUUID
    const userId = crypto.randomUUID().substring(0, 5);

    // Simpan pengguna ke database
    await db.query('INSERT INTO login (id, username, email, password, created_time) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)', [userId, username, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};


// Mengubah login controller untuk menghindari pengiriman header ganda dan menangani error fetch dengan benar

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM login WHERE username = ?', [username]);
    if (!result.length) {
      return res.status(401).json({ message: 'Invalid Username' });
    }

    const user = result[0];
    if (!user.password.startsWith('$2b$')) {
      return res.status(500).json({ message: 'Password hash tidak valid di database' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Mencatat waktu login
    await db.query('INSERT INTO user_sessions (username, login_time) VALUES (?, CURRENT_TIMESTAMP)', [username]);

    // Set session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    // Set cookie
    res.cookie('username', user.username, { httpOnly: true });
    console.log(`your token ${token}`);

    // Kirim token ke server Flask
    try {
      await fetch('http://localhost:5000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
    } catch (fetchError) {
      console.error('Error sending token to Flask:', fetchError);
      // Tambahkan logika penanganan error jika diperlukan, namun tidak mengirim respons kedua
    }

    // Send response
    return res.json({ token, user_id: user.id });

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
};

// Fungsi untuk logout
export const logout = async (req, res) => {
  try {
    console.log('Session user:', req.session.user); // Tambahkan ini
    const username = req.user.username;

    // Mencatat waktu logout untuk session terakhir yang belum memiliki logout_time
    await db.query('UPDATE user_sessions SET logout_time = CURRENT_TIMESTAMP WHERE username = ? AND logout_time IS NULL ORDER BY login_time DESC LIMIT 1', [username]);

    // Hapus session dan cookie
    req.session.destroy();
    res.clearCookie('username');

    res.json({ message: 'Logout recorded successfully' });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM login WHERE email = ?', [email]);
    if (!user.length) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = token;
    const resetPasswordExpires = Date.now() + 300000; // 5 minutes 

    await db.query('UPDATE login SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [resetPasswordToken, resetPasswordExpires, email]);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: 'Password Reset',
      text: `Anda menerima pesan ini karena Anda (atau orang lain) telah meminta pengaturan ulang kata sandi untuk akun Anda.\n\n` +

        `Silakan klik tautan berikut, atau tempelkan ke browser Anda untuk menyelesaikan prosesnya:\n\n` +
        `http://localhost:5173/reset/${token} \n\n` +

        `Jika Anda tidak meminta ini, abaikan email ini dan kata sandi Anda akan tetap tidak berubah atau demi keamanan ubah kata sandi anda.`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'An e-mail has been sent to ' + email + ' with further instructions.' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;


  try {


    const [user] = await db.query('SELECT * FROM login WHERE reset_password_token = ? AND reset_password_expires > ?', [token, Date.now()]);
    if (!user.length) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('UPDATE login SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, user[0].id]);

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

export const Feedback = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const { username } = req.user;
    const { feedback } = req.body;

    const [content] = await db.query('INSERT INTO feedback (username, content) VALUES (?, ?)', [username, feedback]);
    res.status(200).json({ message: 'Feedback submitted successfully' });
    console.log('content feedback:', content);
  } catch (error) {
    console.error('Error in Feedback:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export const userProfileData = async (req, res) => {
  try {
    const username = req.user.username; // Pastikan ini adalah cara Anda mengekstrak username dari token
    const [profile] = await db.query('SELECT username, id, email FROM login WHERE username = ?', [username]);
    console.log('profile:', profile);
    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error in userProfileData:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};


