import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.port || 3000


app.get('/', (req, res) => res.status(200).json({message: 'hello'}))




app.listen(port, () => console.log(`Server is running on port: ${port}`))