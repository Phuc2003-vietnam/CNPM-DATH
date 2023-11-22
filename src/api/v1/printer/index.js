import {Router} from 'express'
import nextJob from './controllers/nextJob.js'

const printer_router = Router()
printer_router.patch('/next', nextJob)

export default printer_router