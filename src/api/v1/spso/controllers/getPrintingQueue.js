const getPrintingQueue = async (req, res, next) => {
	try {
        var {printerId,startDate,endDate}=req.query
		const data = await req.spsoService.getPrintingQueue({printerId,startDate,endDate})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getPrintingQueue
