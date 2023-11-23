const getPrintingLog = async (req, res, next) => {
	try {
        const {printerId}=req.query
		const data = await req.spsoService.getPrintingLog({printerId})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getPrintingLog
