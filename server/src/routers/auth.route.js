import {Router} from 'express';
import { isAuthanticated, login, logout, register, sendVerifyOTP, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', sendVerifyOTP)
authRouter.post('/verify-email', verifyEmail)
authRouter.get('/isauthanticated', isAuthanticated)

export default authRouter