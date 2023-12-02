import SpsoService from '../../spso/services/index.js'

const addMessage = async (req, res, next) => {
	try {
		const {conversationId, text} = req.body
		const senderId=req.user_id
		const data = await req.userService.addMessage({conversationId, senderId, text})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default addMessage
