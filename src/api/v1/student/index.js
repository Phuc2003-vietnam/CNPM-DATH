import {Router} from 'express'
import studentAuth from '#~/middleware/studentAuth.js'
import {confirm_print, deleteSingle_Logs, filterAll_Logs, getAll_Logs} from './controllers/printingLog.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const student_router = Router()
student_router.post('/printing', studentAuth, confirm_print)
student_router.get('/printingLogs', studentAuth, getAll_Logs)
student_router.get('/filterLogs', studentAuth, paginationHandler, filterAll_Logs)
student_router.delete('/cancelLog', studentAuth, deleteSingle_Logs)
export default student_router