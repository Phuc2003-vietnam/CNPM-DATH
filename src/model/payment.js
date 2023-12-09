import mongoose from 'mongoose'
const Schema = mongoose.Schema
const payment = new Schema(
	{
		stt: {type: Number},
		shortContent: {type: String, default: 'default'},
		money: {type: Number},
		paidMoney: {type: Number, default: 0},
		paidDate: {type: Date},
		leftMoney: {type: Number, default: 0},
		endDate: {type: Date, default: Date.now},
		isPaid: {type: Boolean,default:false},
		//Foreign Key
		user_id: {type: String},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('payments', payment)
