import conversation from '#~/model/conversation.js'
import message from '#~/model/message.js'

import {} from 'dotenv/config'

async function getMessage({conversationId}) {
	try {
		var conversationData = await message
			.find({
				conversationId,
			})
			.select('conversationId senderId text createdAt')
			.sort({createdAt: -1})
		return conversationData
	} catch (err) {
		return Promise.reject({status: 500, message: 'System Error'})
	}
}
export default getMessage
