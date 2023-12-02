const getMessage = async (req, res, next) => {
	try {
        var {conversationId}=req.query
		const data = await req.userService.getMessage({conversationId})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getMessage
