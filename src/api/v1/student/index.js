import {Router} from 'express'
import studentAuth from '#~/middleware/studentAuth.js'
import {confirm_print, getAll_Logs} from './controllers/printingLog.js'

const student_router = Router()
student_router.post('/printing', studentAuth, confirm_print)
student_router.get('/printingLogs', getAll_Logs) //Missing auth
export default student_router