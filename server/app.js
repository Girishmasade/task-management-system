import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './src/routers/auth.route.js'
import connectDB from './src/Database/Database.js'
import adminRouter from './src/routers/adminAuth.route.js'
import taskRouter from './src/routers/task.route.js'

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
app.use('/api/admin', adminRouter)
app.use('/api/task', taskRouter)

export {app}