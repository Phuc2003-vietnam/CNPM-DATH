import {Router} from 'express'
import nextJob from './controllers/nextJob.js'
import getPrinters from './controllers/getPrinters.js'

const printer_router = Router()
printer_router.patch('/next', nextJob)
printer_router.get('/printers', getPrinters)

export default printer_router