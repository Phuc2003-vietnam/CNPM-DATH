const paymentHandler = async (req, res, next) => {
	try {
		const {money} = req.body
		const user_id=req.studentService.userInfo._id
		const data = await req.studentService.paymentHandler({
			money,
			user_id
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default paymentHandler
