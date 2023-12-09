import mongoose from 'mongoose'

const message = new mongoose.Schema(
	{
		conversationId: {
			type: String,
		},
		senderId: {
			type: String,
		},
		text: {
			type: String,
		},
	},
	{timestamps: true}
)

export default mongoose.model('messages', message)
