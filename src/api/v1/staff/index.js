import {Router} from 'express'

import editPrinter from './controllers/editPrinter.js'
import getPrintingLog from './controllers/getPrintingLog.js'
import getPrintingQueue from './controllers/getPrintingQueue.js'
import searchPrinterById from './controllers/searchPrinterById.js'
import staffAuth from '#~/middleware/staffAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'
import getNotifications from './controllers/getNotifications.js'
import checkAllNotifications from './controllers/checkAllNotifications.js'

const staff_router = Router()
staff_router.get('/printers', staffAuth, paginationHandler, searchPrinterById)
staff_router.get('/printingQueue', staffAuth, getPrintingQueue)
staff_router.get('/printingLog', staffAuth, getPrintingLog)
staff_router.put('/printer', staffAuth, paginationHandler, editPrinter)
staff_router.get('/notices', staffAuth, getNotifications)
staff_router.put('/notices', staffAuth, checkAllNotifications)

export default staff_router
