import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './src/routers/auth.route.js'
import connectDB from './src/Database/Database.js'
import taskRouter from './src/routers/task.route.js'

dotenv.config({
    path: './.env'
})

const allowedOrigins = ['http://localhost:5173']

const app = express()
app.use(express.json())
app.use(cors({
    origin: allowedOrigins,
    credentials: true 
}))
app.use(cookieParser())

// Database connection
connectDB()



// all Routers
app.use('/api/auth', authRouter)
app.use('/api/task', taskRouter)
export {app}