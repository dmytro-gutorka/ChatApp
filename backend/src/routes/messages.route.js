import express from 'express'
import requireAuth from "../middlewares/requireAuth.js";

export const router = express.Router()

router.get('/send', requireAuth, (req, res) => {
    console.log('userId', req.userId)
    res.status(200).json({message: 'okay'})
})