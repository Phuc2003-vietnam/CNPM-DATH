import {Router} from 'express'
import addPrinter from './controllers/addPrinter.js'
import filterListPrinter from './controllers/filterListPrinter.js'
import spsoAuth from '#~/middleware/spsoAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const spso_router = Router()
spso_router.post('/printer', spsoAuth,addPrinter)
spso_router.get('/printers', spsoAuth,paginationHandler,filterListPrinter)

export default spso_router
