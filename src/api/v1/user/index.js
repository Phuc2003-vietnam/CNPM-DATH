import {Router} from 'express'
// import login from './controllers/login.js'
import register from './controllers/register.js'

const user_router = Router()
user_router.post('/register', register)
export default user_router
