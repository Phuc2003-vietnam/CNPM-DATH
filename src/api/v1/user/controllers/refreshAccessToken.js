import UserSerivce from '../services/index.js'

const login = async (req, res, next) => {
	try {
		const {email, password} = req.body
		await new UserSerivce().login({
			email,
			password,
		})
		res.status(200).json({message: "Login success fully"})
	} catch (err) {
		console.log("hello");
		next(err)
	}
}

export default login
