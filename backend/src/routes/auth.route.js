import {
    getMe,
    logout, Oauth2CallbackFail, Oauth2CallbackSuccess,
} from '../controllers/auth.controller.js';
import express from 'express';
import {googlePassport} from "../strategies/google.js";
import {facebookPassport} from "../strategies/facebook.js";

export const router = express.Router();

router.get(
    '/facebook',
    facebookPassport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/facebook/callback',
    facebookPassport.authenticate('facebook', { failureRedirect: '/api/v1//auth/fail' }),
    Oauth2CallbackSuccess
);


router.get('/google', googlePassport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

router.get(
  '/google/callback',
    googlePassport.authenticate('google', { failureRedirect: '/api/v1/auth/fail' }),
    Oauth2CallbackSuccess
);

router.get('/fail', Oauth2CallbackFail);
router.get('/me', getMe);
router.post('/logout', logout);
