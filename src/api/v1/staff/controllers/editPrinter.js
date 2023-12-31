const editPrinter = async (req, res, next) => {
	try {
		const {printerId, status} = req.body
		const data=await req.staffService.editPrinter({
			printerId,
			status,
			userInfo: req.staffService.userInfo
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default editPrinter
