import {Router} from 'express'

import editPrinter from './controllers/editPrinter.js'
import searchPrinterById from './controllers/searchPrinterById.js'
import staffAuth from '#~/middleware/staffAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const staff_router = Router()
staff_router.get('/printers', staffAuth, paginationHandler, searchPrinterById)
staff_router.put('/printer', staffAuth, paginationHandler, editPrinter)

export default staff_router
