import {Router} from 'express'
import leader_router from './leader/index.js'

const ver1_router = Router()
ver1_router.use('/leader', leader_router)

export default ver1_router
