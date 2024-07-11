import { db } from '../database/db.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import { google } from 'googleapis';



export const gauth_callback = async (req, res) => {
  const oauth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/auth/google/callback'
  );

  const { code } = req.query;
  try {
      const { tokens } = await oauth.getToken(code);
      oauth.setCredentials(tokens);

      const oauth2 = google.oauth2({
          auth: oauth,
          version: 'v2'
      });
      const { data } = await oauth2.userinfo.get();

      if (!data) {
          return res.json({ data: data });
      }

      let user = {
          id: data.id,
          email: data.email,
          name: data.name,
          picture: data.picture
      };

      res.json({ user });
  } catch (error) {
      console.error('Error during Google OAuth callback:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

export const post_gauth_callback = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    'http://localhost:3000/auth/google/callback'
  );

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

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
    const [existingUser] = await db.query('SELECT * FROM login WHERE email = ?', [user.email]);
    if (existingUser.length === 0) {
      const userId = crypto.randomUUID().substring(0, 5);
      await db.query('INSERT INTO login (id, email, username) VALUES (?, ?, ?)', [userId, user.email, user.name]);
    }

    // Insert user session
    await db.query('INSERT INTO user_sessions (username, login_time) VALUES (?, CURRENT_TIMESTAMP)', [user.name]);

    // Generate JWT token for authentication
    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save user session in req.session
    req.session.user = user;
    console.log(`ur token :${jwtToken}`)
    try {
      await fetch('http://localhost:5000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: jwtToken })
      });
    } catch (fetchError) {
      console.error('Error sending token to Flask:', fetchError);
      // Tambahkan logika penanganan error jika diperlukan, namun tidak mengirim respons kedua
    }

    // Respond with user information and JWT token
    res.json({ user, token: jwtToken });

    // Update logout_time for the latest active session
    
  } catch (error) {
    console.error('Error during Google OAuth callback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout_google = async (req, res) => {
  try {
    const user = req.session.user;
    
    if (user) {
      // Update logout time in user_sessions table
      await db.query(
        'UPDATE user_sessions SET logout_time = CURRENT_TIMESTAMP WHERE username = ? AND logout_time IS NULL ORDER BY login_time DESC LIMIT 1',
        [user.name]
      );

      // Clear session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Error during logout' });
        }
        
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logout successful' });
      });
    } else {
      res.status(400).json({ message: 'No user session found' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error during logout' });
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


export const googleSessionHistory = async (req, res) => {
  try {
    const { email } = req.user; // Pastikan Anda menggunakan middleware autentikasi untuk menyetel req.user
    console.log('User email:', email);
    const [sessions] = await db.query('SELECT login_time, logout_time FROM user_sessions WHERE username = ?', [email]);

    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};
