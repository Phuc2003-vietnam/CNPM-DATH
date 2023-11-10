import UserSerivce from '../services/index.js'
const register = async(req, res, next) => {
	try {
		// throw new Error("This is a custom error message");
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
		} = req.body
		await new UserSerivce().register({
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
		})
		res.status(200).json('OK')
	} catch (err) {
		console.log("gello");
		next(err)
	}
}

export default register
