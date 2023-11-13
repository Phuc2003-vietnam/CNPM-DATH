import UserSerivce from '../services/index.js'

const getUserInfo = async (req, res, next) => {
	try {
		console.log("wtf");
		const data = await req.getUserInfo(req.accessToken)
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getUserInfo
