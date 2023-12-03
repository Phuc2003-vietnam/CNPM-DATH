import message from '#~/model/message.js'
import conversation from '#~/model/conversation.js'
import user from '#~/model/user.js'
async function addMessage({conversationId, senderId, text}) {
	//Handle empty message
	if (text.length == 0) {
		return Promise.reject({
			status: 403,
			message: 'Empty text, enter a value',
		})
	}
	const data = await conversation.findById(conversationId)

	if (data) {
	//Handle sender not belong to a conversation

		const members = data[0].members
		if (members.includes(senderId)) {
			return Promise.reject({
				status: 403,
				message: `Your account doesnt belong to this conversation id`,
			})
		}
		//create message
		const messageRecord = await message.create({
			conversationId,
			senderId,
			text,
		})
		return messageRecord
	} else {
		//Handle conversationId wrong value
		return Promise.reject({
			status: 403,
			message: `The conversationId is not correct you send: ${conversationId}`,
		})
	}
}

export default addMessage
