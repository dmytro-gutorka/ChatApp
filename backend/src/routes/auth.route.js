import {getMe, googleCallback, googleCallbackFail, logout} from "../controllers/auth.controller.js";
import express from 'express';
import passport from '../strategies/google.js';

export const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/v1/auth/fail' }),
    googleCallback
);

router.get('/fail', googleCallbackFail)
router.get('/me', getMe)
router.post('/logout', logout);
