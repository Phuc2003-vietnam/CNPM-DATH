const getSystemConfig = async (req, res, next) => {
	try {
		const data = await req.spsoService.getSystemConfig()
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getSystemConfig
