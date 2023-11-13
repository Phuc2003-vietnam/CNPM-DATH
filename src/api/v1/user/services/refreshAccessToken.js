import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import token from '#~/model/token.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME
const refresh_token_key = process.env.REFRESH_TOKEN_KEY
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME

async function refreshAccessToken({refreshToken}) {
	try{
		var {user_id,session_id}=jwt.verify(refreshToken,refresh_token_key)
		const accessToken = jwt.sign(
			{
				user_id,
				session_id
			},
			access_token_key,
			{
				expiresIn: access_token_expires_time,
			}
		)
		await token.updateOne({user_id,session_id},{$set:{accessToken}})
		return	{accessToken,refreshToken}
	}
	catch (err) {
		return Promise.reject({status: 401, message: 'Unauthorized'})
	}

}

export default refreshAccessToken
