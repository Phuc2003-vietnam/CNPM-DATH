import user from '#~/model/user.js'
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'
import configuration from '#~/model/configuration.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY

async function getUserInfo(accessToken) {
	try {
		var {user_id, session_id} = jwt.verify(accessToken, access_token_key)
		const configurationRecord = await configuration.findOne({})
		var userRecord = (await user.findOne({_id: user_id}).select('-password')).toObject()
		userRecord.currentA4Price=configurationRecord.currentA4Price
		this.userInfo=userRecord
		return userRecord
	} catch (err) {
		return Promise.reject({status: 401, message: 'Unauthorized'})
	}
}
export default getUserInfo
