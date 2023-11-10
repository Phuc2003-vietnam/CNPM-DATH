import {Router} from 'express'
import user_router from './user/index.js'

const ver1_router = Router()
ver1_router.use('/user', user_router)
export default ver1_router
