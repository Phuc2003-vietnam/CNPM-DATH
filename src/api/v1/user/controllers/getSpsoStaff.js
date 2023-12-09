const getSpsoStaff = async (req, res, next) => {
	try {
        var user_id=req.user_id
		const data = await req.userService.getSpsoStaff({user_id})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getSpsoStaff
