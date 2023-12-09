import conversation from '#~/model/conversation.js'
import user from '#~/model/user.js'

import {} from 'dotenv/config'

async function getConversationId(members) {
	try {
		// check if  receiver_id in members valid
		const receiver_id = members[1]
		const receiver = await user.findById(receiver_id)
		if (!receiver) {
			return Promise.reject({status: 404, message: `The receiver_id is not correct you send: ${receiver_id}`})
		}
		var conversationData = await conversation.find(
			{
				members: {
					$all: members,
					$size: members.length,
				},
			},
			{
				_id: 0,
				conversationId: '$_id',
				members: 1,
				createdAt: 1,
				updatedAt: 1,
			}
		)
		// if find no conversation between 2 people , create a conversation with empty message
		if (conversationData.length == 0) {
			conversationData = await conversation.create({
				members,
			})
			conversationData = conversationData.toObject()
			conversationData.conversationId = conversationData._id
		}
		return conversationData
	} catch (err) {
		console.log(err)
		return Promise.reject({status: 500, message: 'System Error'})
	}
}
export default getConversationId
