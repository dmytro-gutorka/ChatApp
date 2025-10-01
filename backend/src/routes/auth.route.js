import express from 'express';


export const router = express.Router();

router.get('/signup', (req, res) => res.status(200).json({message: 'sign up'}))
router.get('/login', (req, res) => res.status(200).json({message: 'log in'}))
router.get('/logout', (req, res) => res.status(200).json({message: 'log out'}))