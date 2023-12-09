import message from '#~/model/message.js'
import conversation from '#~/model/conversation.js'
async function addMessage({conversationId, senderId, text}) {
	try {
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
			console.log(senderId);
			const members = data.members
			console.log(members);
			if (!members.includes(senderId)) {
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
	} catch (err) {
		console.log(err)
		return Promise.reject({status: 500, message: 'System Error'})
	}
}

export default addMessage
