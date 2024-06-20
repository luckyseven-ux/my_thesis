import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import helmet from  'helmet'

import { db } from './src/database/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import predictRoutes from './src/routes/predictRoutes.js';
import session from 'express-session';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet({
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
}));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
  );
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'some secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 300000 },
}));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/predict', predictRoutes);

// Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to database');
    connection.release();
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
