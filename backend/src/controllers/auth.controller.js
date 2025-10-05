import setAuthCookie from '../helpers/setAuthCookie.js';
import { chatsSeed } from '../helpers/chatsSeed.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function googleCallback(req, res) {
  setAuthCookie(res, { sub: req.user.id });
  await chatsSeed(req.user.id);
  res.redirect(process.env.CLIENT_URL);
}

export async function googleCallbackFail(req, res) {
  res.status(401).send('Auth failed');
}

export async function logout(req, res) {
  req.logout(() => {});

  res.clearCookie('auth_token', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
  });
  res.status(204).end();
}

export async function getMe(req, res) {
  const token = req.cookies['auth_token'];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    const user = (await User.findById(sub)) || null;
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ user: null });
  }
}
