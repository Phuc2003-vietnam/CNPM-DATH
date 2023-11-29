const getPrintingLog = async (req, res, next) => {
	try {
        var {printerId,startDate,endDate}=req.query
        const location=req.staffService.userInfo.location
		const data = await req.staffService.getPrintingLog({printerId,startDate,endDate,location})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getPrintingLog
