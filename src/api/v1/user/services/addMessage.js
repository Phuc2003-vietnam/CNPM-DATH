import message from '#~/model/message.js'
import conversation from '#~/model/conversation.js'
import user from '#~/model/user.js'

async function addMessage({conversationId, senderId, text}) {
	if(text.length==0)
	{
		return Promise.reject({
			status: 403,
			message: 'Empty text, enter a value',
		})
	}
	const data = await conversation.find({_id:conversationId})
	if (data.length>0) {
		const messageRecord = await message.create({
			conversationId,
			senderId,
			text
		})
		return messageRecord
	} else {
		return Promise.reject({
			status: 403,
			message: 'conversationId wrong value',
		})
	}
}

export default addMessage
