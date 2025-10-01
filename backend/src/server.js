import express from 'express'
import dotenv from 'dotenv'
import {rootRouter} from "./routes/index.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use('/api/v1', rootRouter)



app.listen(port, () => console.log(`Server is running on port: ${port}`))