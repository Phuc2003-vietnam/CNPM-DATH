import StaffService from '#~/api/v1/staff/services/index.js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
const access_token_key = process.env.ACCESS_TOKEN_KEY

const spsoAuth = async (req, res, next) => {
	try {
		const accessToken = req.headers.authorization.split(' ')[1]
		var {user_id, session_id} = jwt.verify(accessToken, access_token_key)
		const staffService = new StaffService()
		const userInfo = await staffService.getUserInfo(accessToken)
		if (userInfo.role != 'staff') {
			next({status: 401, message: 'Unauthorized'})
		} else {
			req.staffService = staffService
			next()
		}
	} catch (err) {
		next({status: 401, message: 'Unauthorized'})
	}
}

export default spsoAuth
