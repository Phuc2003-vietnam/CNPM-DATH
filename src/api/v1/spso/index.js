import {Router} from 'express'
import addPrinter from './controllers/addPrinter.js'
import filterListPrinter from './controllers/filterListPrinter.js'
import searchPrinterId from './controllers/searchPrinterId.js'
import spsoAuth from '#~/middleware/spsoAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const spso_router = Router()
spso_router.post('/printer', spsoAuth,addPrinter)
spso_router.get('/printers', spsoAuth,paginationHandler,filterListPrinter)
spso_router.get('/printers-by-id/:printerId?', spsoAuth,paginationHandler,searchPrinterId)

export default spso_router
