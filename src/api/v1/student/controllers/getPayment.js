const getPayment = async (req, res, next) => {
	try {
		const user_id=req.studentService.userInfo._id
		const data = await req.studentService.getPayment({
			user_id
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getPayment
