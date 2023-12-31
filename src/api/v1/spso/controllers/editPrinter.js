const editPrinter = async (req, res, next) => {
	try {
		const {printerId, brand, model, location, status, description} = req.body
		const data=await req.spsoService.editPrinter({
			printerId,
			brand,
			model,
			location,
			status:parseInt(status),
			description,
			userInfo: req.spsoService.userInfo
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default editPrinter
