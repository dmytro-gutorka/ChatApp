import passport from "../strategies/google.js";
import express from 'express';
import setAuthCookie from "../helpers/setAuthCookie.js";


export const router = express.Router();

// router.get('/signup', async (req, res) => {
//     await User.create({ firstName: 'Dmytro', lastName: "Gutorka", password: '1234567890', email: 'dgutorka1@gmail.com' })
//     const user = await User.findOne({ email: 'dgutorka1@gmail.com'})
//     console.log(user)
//     res.status(200).json({message: 'sign up'})
// })
//
// router.get('/login', (req, res) => res.status(200).json({message: 'log in'}))
// router.get('/logout', (req, res) => res.status(200).json({message: 'log out'}))



router.get("/google",
    passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }))

router.get("/google/callback",
    passport.authenticate('google', { failureRedirect: '/api/v1/auth/fail'}),
    (req, res) => {
        setAuthCookie(res, { sub: req.user.id })
        res.redirect(process.env.DEV_CLIENT_URL)
    })

router.get('/fail', (_req, res) => {
    res.status(401).send('Auth failed')
});