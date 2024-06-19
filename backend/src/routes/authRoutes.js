import express from 'express';
import { gauth_callback } from '../controllers/authController.js';
import { google } from 'googleapis';
const router = express.Router();

router.get('/google', (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
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

export default router;
