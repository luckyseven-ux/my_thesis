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

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Mencatat waktu login
    await db.query('INSERT INTO user_sessions (username, login_time) VALUES (?, CURRENT_TIMESTAMP)', [username]);

    // Set session
    req.session.user = {
      username: user.username,
      email: user.email
    };

    // Set cookie
    res.cookie('username', user.username, { httpOnly: true });

    // Send response
    res.json({ token });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
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
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://localhost:5173/reset/${token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
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