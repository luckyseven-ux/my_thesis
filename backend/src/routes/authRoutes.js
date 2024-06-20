import express from 'express';
import { gauth_callback, logout_google, post_gauth_callback } from '../controllers/authController.js';
import { google } from 'googleapis';
import { authenticateJWT } from '../middleware/auth.js';
const router = express.Router();

router.get('/google', (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  res.redirect(url);
});

// Handle the callback from Google's OAuth 2.0 server
router.get('/google/callback', gauth_callback);
router.post('/google/callback', post_gauth_callback);
router.post('/google/logout', authenticateJWT,logout_google);





export default router;
