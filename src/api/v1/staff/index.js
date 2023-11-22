import {Router} from 'express'

import searchPrinterById from './controllers/searchPrinterById.js'
import staffAuth from '#~/middleware/staffAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const staff_router = Router()
staff_router.get('/printers', staffAuth,paginationHandler,searchPrinterById)
export default staff_router
