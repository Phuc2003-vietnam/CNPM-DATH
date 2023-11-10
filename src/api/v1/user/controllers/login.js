const login = (req, res, next) => {
	try {
		res.status(200).json('OK')
	} catch (err) {
		next(err)
	}
}

export default login
