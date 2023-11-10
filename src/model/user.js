import mongoose from 'mongoose'
const Schema = mongoose.Schema
const user = new Schema(
	{
		email: {type: String, default: null, maxLength: 100},
		password: {type: String, default: null},
		firstName: {type: String, default: null, maxLength: 50},
		lastName: {type: String, default: null, maxLength: 50},
		mssv: {type: String, default: null, maxLength: 50},
		role: {type: String, default: null, maxLength: 50},
		balance: {type: Number, default: 0},
		location: {
			facility: {type: String, default: null, maxLength: 20},
			department: {type: String, default: null, maxLength: 20},
			room: {type: String, default: null, maxLength: 20},
		},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('users', user)
