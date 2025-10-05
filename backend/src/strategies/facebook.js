import 'dotenv/config';

import User from "../models/User.js";
import passport from "passport";
import { Strategy as FacebookStrategy } from 'passport-facebook';


passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'emails', 'photos'],
        enableProof: true,
    },
    async (_accessToken, _refreshToken, profile, done) => {
        try {
            const fbId = profile.id;
            const email = profile.emails?.[0]?.value;
            const avatar = profile.photos?.[0]?.value;

            let user = await User.findOne({ provider: 'facebook', providerId: fbId });
            if (!user) {
                user = await User.create({
                    provider: 'facebook',
                    providerId: fbId,
                    displayName: profile.displayName,
                    email,
                    avatar,
                });
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }
));

export { passport as facebookPassport}