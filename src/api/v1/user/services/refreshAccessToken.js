import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import {prisma} from '#~/config/db-setup.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME
const refresh_token_key = process.env.REFRESH_TOKEN_KEY

async function refreshAccessToken(refresh_token) {
	
}

export default refreshAccessToken
