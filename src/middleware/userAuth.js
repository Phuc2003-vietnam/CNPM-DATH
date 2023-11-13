import UserSerivce from '#~/api/v1/user/services/index.js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
const access_token_key = process.env.ACCESS_TOKEN_KEY

const userAuth = async (req, res, next) => {
	try {
		const accessToken = req.headers.authorization.split(' ')[1]
		var {user_id, session_id} = jwt.verify(accessToken, access_token_key)
		console.log(user_id)
		const userService = new UserSerivce()
		req.userService = UserSerivce
		req.accessToken=accessToken
		next()
	} catch (err) {
		console.log(err);
		next({status: 401, message: 'Unauthorized'})
	}
}

export default userAuth
