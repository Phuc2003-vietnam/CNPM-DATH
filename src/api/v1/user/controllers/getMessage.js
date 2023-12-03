const getMessage = async (req, res, next) => {
	try {
        var {conversationId}=req.query
		var user_id=req.user_id
		const data = await req.userService.getMessage({conversationId,user_id})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getMessage
