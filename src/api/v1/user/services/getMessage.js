import conversation from '#~/model/conversation.js'
import message from '#~/model/message.js'

import {} from 'dotenv/config'

async function getMessage({conversationId, user_id}) {
	try {
		const data = await conversation.findById(conversationId)
		if (data) {
			//Handle sender not belong to a conversation
			const members = data[0].members
			if (members.includes(user_id)) {
				return Promise.reject({
					status: 403,
					message: `Your account doesnt belong to this conversation id`,
				})
			}
			var conversationData = await message
				.find({
					conversationId,
				})
				.select('conversationId senderId text createdAt')
				.sort({createdAt: -1})
			return conversationData
		} else {
			//Handle conversationId wrong value
			return Promise.reject({
				status: 403,
				message: `The conversationId is not correct you send: ${conversationId}`,
			})
		}
	} catch (err) {
		return Promise.reject({status: 403, message: 'The conversationId is not valid you send: '+err.value})
	}
}
export default getMessage
