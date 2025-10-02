import passport from 'passport';
import  User  from '../models/User.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';


passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        // const user = await User.findById(id);
        done(null, null);
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
        // const googleId = profile.id;
        // const email = profile.emails?.[0]?.value;
        // const avatar = profile.photos?.[0]?.value;
        //
        //
        // let user = await User.findOne({ provider: 'google', providerId: googleId });
        // if (!user) {
        //     user = await User.create({
        //         provider: 'google',
        //         providerId: googleId,
        //         displayName: profile.displayName,
        //         email,
        //         avatar,
        //     });
        // }
        console.log(profile);
        return done(null, 1111);
    } catch (e) {
        console.error(e);
        return done(e);
    }
}));


export default passport;