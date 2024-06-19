import { db } from '../database/db.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import { google } from 'googleapis';



export const gauth_callback = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    'http://localhost:3000/auth/google/callback'
  );

  const { token } = req.body;
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    // Check if user exists, if not create one
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
    if (existingUser.length === 0) {
      await db.query('INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)', [user.id, user.email, user.name, user.picture]);
    }

    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token: jwtToken });
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const deleteUser = async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: 'Username or email is required' });
  }

  try {
    const [result] = await db.query('DELETE FROM login WHERE username = ? OR email = ?', [username, email]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};


