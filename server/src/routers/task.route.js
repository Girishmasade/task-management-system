import {Router} from 'express'
import { addTask } from '../controllers/task.controller.js'

const taskRouter = Router()

taskRouter.post('/add-task', addTask)

export default taskRouter