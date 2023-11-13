import UserSerivce from '../services/index.js'

const getUserInfo = async (req, res, next) => {
	try {
		const data = await req.userService.getUserInfo(req.accessToken)
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getUserInfo
