const BKpayHandler = async (req, res, next) => {
	try {
		const {payment_id} = req.body
		const user_id=req.studentService.userInfo._id
		const data = await req.studentService.BKpayHandler({
			payment_id,
			user_id
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default BKpayHandler
