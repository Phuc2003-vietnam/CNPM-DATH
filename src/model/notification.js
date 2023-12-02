import mongoose from 'mongoose'
const Schema = mongoose.Schema
const notification = new Schema(
	{
        //Sender
        sender: {
            user_id: {type: String, maxLength: 50},
            role: {type: String, default: null, maxLength: 50},
            firstName: {type: String, default: null, maxLength: 50},
            lastName: {type: String, default: null, maxLength: 50}
        },

        //Detail information
		action: {type: String, default: null, maxLength: 20}, // "disable", "enable", "editInfor"
		description: {type: String, default: '', maxLength: 1000},
		actionTime: {type: Date, default: Date.now},
		
        //Printer information
		printerId: {type: String, default: 'default', maxLength: 50},
		location: {
			facility: {type: String, default: 'CS2', maxLength: 20},
			department: {type: String, default: 'H1', maxLength: 20},
			room: {type: String, default: '202', maxLength: 20},
		},

        //Receiver seen or not
        seen: {type: Boolean, default: false},

        //Receiver
        receiver: {
            user_id: {type: String, maxLength: 50},
            role: {type: String, default: null, maxLength: 50},
            firstName: {type: String, default: null, maxLength: 50},
            lastName: {type: String, default: null, maxLength: 50}
        },
		
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('notifications', notification)
