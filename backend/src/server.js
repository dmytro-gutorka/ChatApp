import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import {rootRouter} from "./routes/index.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.resolve()

app.use('/api/v1', rootRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get(/^\/(?!api\/v1).*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/', 'dist', 'index.html'))
    })
}

app.listen(port, () => console.log(`Server is running on port: ${port}`))