import {Router} from 'express'
import studentAuth from '#~/middleware/studentAuth.js'
import {confirm_print, deleteSingle_Logs, filterAll_Logs, getAll_Logs} from './controllers/printingLog.js'
import getPayment from './controllers/getPayment.js'
import paymentHandler from './controllers/paymentHandler.js'
import BKpayHandler from './controllers/BKpayHandler.js'
import paginationHandler from '#~/middleware/paginationHandler.js'
import {uploadMultiple} from '#~/config/upload.js'
import getPrinters from './controllers/getPrinters.js'
import getSinglePrinter from './controllers/getSinglePrinter.js'

const student_router = Router()
student_router.post('/confirm-payment', studentAuth, paymentHandler)
student_router.post('/BKpayment', studentAuth, BKpayHandler)
student_router.post('/printing', studentAuth, uploadMultiple,confirm_print)
student_router.get('/printingLogs', studentAuth, getAll_Logs)
student_router.get('/filterLogs', studentAuth, paginationHandler, filterAll_Logs)
student_router.get('/payments', studentAuth, getPayment)
student_router.delete('/cancelLog', studentAuth, deleteSingle_Logs)
student_router.get('/printers', studentAuth, paginationHandler, getPrinters)
student_router.get('/printer', studentAuth, getSinglePrinter)
export default student_router