import {Router} from 'express'
// import login from './controllers/login.js'
import register from './controllers/register.js'
import login from './controllers/login.js'
import refreshAccessToken from './controllers/refreshAccessToken.js'
import getUserInfo from './controllers/getUserInfo.js'

import userAuth from '#~/middleware/userAuth.js'

const user_router = Router()
user_router.post('/register', register)
user_router.post('/login', login)
user_router.post('/refresh-access-token', userAuth,refreshAccessToken)
user_router.get('/information', userAuth,getUserInfo)

export default user_router
