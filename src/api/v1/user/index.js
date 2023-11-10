import {Router} from 'express'
// import login from './controllers/login.js'
import register from './controllers/register.js'
import login from './controllers/login.js'

const user_router = Router()
user_router.post('/register', register)
user_router.post('/login', login)

export default user_router
