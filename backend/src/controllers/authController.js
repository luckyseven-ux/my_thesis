import { db } from '../database/db.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM login WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    await db.query('INSERT INTO login (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
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
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
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
