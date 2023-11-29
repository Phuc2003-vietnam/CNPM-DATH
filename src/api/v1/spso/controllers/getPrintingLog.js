const getPrintingLog = async (req, res, next) => {
	try {
        var {printerId,startDate,endDate}=req.query
		const data = await req.spsoService.getPrintingLog({printerId,startDate,endDate})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getPrintingLog
