import {Router} from 'express'
import addPrinter from './controllers/addPrinter.js'

const spso_router = Router()
spso_router.post('/printer', addPrinter)

export default spso_router
