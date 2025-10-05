import passport from '../strategies/google.js';
import express from 'express';
import setAuthCookie from '../helpers/setAuthCookie.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { chatsSeed } from '../helpers/chatsSeed.js';

export const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/fail' }),
  async (req, res) => {
    setAuthCookie(res, { sub: req.user.id });
    await chatsSeed(req.user.id);
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get('/fail', (_req, res) => {
  res.status(401).send('Auth failed');
});

router.post('/logout', async (req, res) => {
  req.logout(() => {});
  console.log('Logged out');
  res.clearCookie('auth_token', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
  });
  res.status(204).end();
});

router.get('/me', async (req, res) => {
  const token = req.cookies['auth_token'];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    const user = (await User.findById(sub)) || null;
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ user: null });
  }
});
