import 'dotenv/config';
import passport from 'passport';
import User from '../models/User.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user || undefined);
    } catch (e) {
        done(e);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        console.log('Google Profile', profile)

        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const avatar = profile.photos?.[0]?.value;

        let user = await User.findOne({ provider: 'google', providerId: googleId });
        if (!user) {
            user = await User.create({
                provider: 'google',
                providerId: googleId,
                displayName: profile.displayName,
                email,
                avatar,
            });
        }
        return done(null, user);
    } catch (e) {
        return done(e);
    }
}));


export default passport;