import {Router} from 'express'
import addPrinter from './controllers/addPrinter.js'
import editPrinter from './controllers/editPrinter.js'
import filterListPrinter from './controllers/filterListPrinter.js'
import filterAllStudent from './controllers/filterAllStudent.js'
import spsoAuth from '#~/middleware/spsoAuth.js'
import paginationHandler from '#~/middleware/paginationHandler.js'

const spso_router = Router()
spso_router.post('/printer', spsoAuth,addPrinter)
spso_router.get('/printers', spsoAuth,paginationHandler,filterListPrinter)
spso_router.put('/printer', spsoAuth,editPrinter)
spso_router.get('/students', spsoAuth, paginationHandler, filterAllStudent)
export default spso_router
