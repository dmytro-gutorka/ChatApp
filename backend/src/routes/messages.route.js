import express from 'express'

export const router = express.Router()



router.get('/send', (req, res) => res.status(200).json({message: 'okay'}))