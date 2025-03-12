import {Router} from 'express';
import { isAuthanticated, login, logout, register, resetPassword, sendResetPassword, sendVerifyOTP, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', sendVerifyOTP)
authRouter.post('/verify-email', verifyEmail)
authRouter.get('/isauthanticated', isAuthanticated)
authRouter.post('/send-reset-password-otp', sendResetPassword)
authRouter.post('/forget-password', resetPassword)

export default authRouter