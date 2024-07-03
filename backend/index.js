import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import helmet from  'helmet'

import { db } from './src/database/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import recordRoutes from './src/routes/recordRoutes.js';
import historyRoutes from './src/routes/historyRoutes.js';
import session from 'express-session';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' },{origin:'http://localhost:5000'}));
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
  );
  next();
});

app.use(session({
  secret: '$buncit&12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 900000 },
}));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/predict', recordRoutes);
app.use('/history', historyRoutes);

// Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to database');
    connection.release();
  }
});

app.get('/get-user', (req, res) => {
  const user = req.session.user;
  res.send(`Session user: ${user ? user.username : 'undefined'}`);
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
