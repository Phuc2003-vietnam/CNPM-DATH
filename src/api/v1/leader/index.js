import {Router} from 'express'
import login from './controllers/login.js'

const leader_router = Router()
leader_router.post('/login', login)
export default leader_router
