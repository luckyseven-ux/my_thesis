import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import session from 'express-session';

import { db } from './src/database/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import recordRoutes from './src/routes/recordRoutes.js';
import historyRoutes from './src/routes/historyRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "data:"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  frameguard: {
    action: 'deny',
  },
  referrerPolicy: {
    policy: 'no-referrer',
  },
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: {
    maxAge: 31536000, // 1 tahun
    includeSubDomains: true,
    preload: true,
  },
}));


app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY'); // Adding X-Frame-Options header
  res.setHeader('X-Content-Type-Options', 'nosniff'); // Adding X-Content-Type-Options header
  next();
});

app.use(session({
  secret: '$buncit&12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }, // 1 hour
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