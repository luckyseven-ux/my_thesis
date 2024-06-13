import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { db } from './src/database/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import predictRoutes from './src/routes/predictRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

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
