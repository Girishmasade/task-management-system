import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './src/routers/auth.route.js'
import connectDB from './src/Database/Database.js'

dotenv.config({
    path: './.env'
})

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true 
}))
app.use(cookieParser())

// Database connection
connectDB()



// all Routers
app.use('/api/auth', authRouter)

export {app}