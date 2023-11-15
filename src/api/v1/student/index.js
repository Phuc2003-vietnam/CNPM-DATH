import {Router} from 'express'
import studentAuth from '#~/middleware/studentAuth.js'
import {confirm_print} from './controllers/printingLog.js'

const student_router = Router()
student_router.post('/printing', studentAuth, confirm_print)
export default student_router