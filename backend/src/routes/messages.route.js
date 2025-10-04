import express from 'express'
import requireAuth from "../middlewares/requireAuth.js";

export const router = express.Router()

router.get('/send', requireAuth, (req, res) => {

    res.status(200).json({message: 'okay'})
})