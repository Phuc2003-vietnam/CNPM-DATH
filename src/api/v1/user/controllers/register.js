import UserSerivce from '../services/index.js'
const register = async (req, res, next) => {
	try {
		const {
			email,
			password,
			role,
			mssv,
			firstName,
			lastName,
			balance,
			facility,
			department,
			room,
			classes,
			major,
		} = req.body
		const data = await new UserSerivce().register({
			email,
			password,
			role,
			mssv,
			firstName,
			lastName,
			balance,
			facility,
			department,
			room,
			classes,
			major,
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default register
