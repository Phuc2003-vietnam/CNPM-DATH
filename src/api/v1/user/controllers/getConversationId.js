const getConversation = async (req, res, next) => {
	try {
        var sender_id=req.user_id
        var {receiver_id}=req.query
		const data = await req.userService.getConversationId([sender_id,receiver_id])
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default getConversation
