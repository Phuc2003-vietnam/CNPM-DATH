import conversation from '#~/model/conversation.js'

import {} from 'dotenv/config'

async function getConversationId(members) {
	try {
        // not yet test if  id in members valid
		console.log(members);
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
			console.log(conversationData);
		// if find no conversation between 2 people , create a conversation with empty message
		if (conversationData.length == 0) {
			conversationData = await conversation.create({
				members,
			})
            conversationData =  conversationData.toObject();
			conversationData.conversationId=conversationData._id
		}
		return conversationData
	} catch (err) {
		console.log(err)
		return Promise.reject({status: 500, message: 'System Error'})
	}
}
export default getConversationId
