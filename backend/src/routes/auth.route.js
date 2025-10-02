import express from 'express';
import User from "../models/User.js";


export const router = express.Router();

router.get('/signup', async (req, res) => {
    await User.create({ firstName: 'Dmytro', lastName: "Gutorka", password: '1234567890', email: 'dgutorka1@gmail.com' })
    const user = await User.findOne({ email: 'dgutorka1@gmail.com'})
    console.log(user)
    res.status(200).json({message: 'sign up'})
})
router.get('/login', (req, res) => res.status(200).json({message: 'log in'}))
router.get('/logout', (req, res) => res.status(200).json({message: 'log out'}))

