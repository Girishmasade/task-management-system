import {Router} from 'express';
import { login, logout, register, sendVerifyOTP } from '../controllers/auth.controller.js';

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', sendVerifyOTP)

export default authRouter