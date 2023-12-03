import SpsoService from '#~/api/v1/spso/services/index.js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
const access_token_key = process.env.ACCESS_TOKEN_KEY

const spsoAuth = async (req, res, next) => {
	try {
		const accessToken = req.headers.authorization.split(' ')[1]
		var {user_id, session_id} = jwt.verify(accessToken, access_token_key)
		const spsoService = new SpsoService()
		console.log("helo");
		console.log(spsoService);
		const userInfo = await spsoService.getUserInfo(accessToken)
		console.log(userInfo);
		if (userInfo.role != 'spso') {
			next({status: 401, message: 'Unauthorized'})
		} else {
			req.spsoService = spsoService
			next()
		}
	} catch (err) {
		console.log(err);
		next({status: 401, message: 'Unauthorized'})
	}
}

export default spsoAuth
