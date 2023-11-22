const editSystemConfig = async (req, res, next) => {
	try {
		const {currentBalance, startDate1, startDate2, currentA4Price, currentFileType, isDefault} =
			req.body
		const data = await req.spsoService.editSystemConfig({
			currentBalance,
			startDate1,
			startDate2,
			currentA4Price,
			currentFileType,
			isDefault,
		})
	console.log("hel");

		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default editSystemConfig
