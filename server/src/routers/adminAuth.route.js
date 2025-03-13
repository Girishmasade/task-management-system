import {Router} from 'express'
import { loginAdmin, registerAdmin } from '../controllers/adminAuth.controller.js'

const adminRouter = Router()

adminRouter.post('/register', registerAdmin)
adminRouter.post('/login', loginAdmin)

export default adminRouter