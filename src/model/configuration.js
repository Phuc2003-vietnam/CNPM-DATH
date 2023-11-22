import mongoose from 'mongoose'
const Schema = mongoose.Schema
const configuration = new Schema(
	{
		startDate1: {type: Date, default: Date.now},
		startDate2: {type: Date, default: Date.now},
		defaultBalance: {type: Number},
		currentBalance: {type: Number},
		defaultA4Price: {type: Number},
		currentA4Price: {type: Number},
		defaultFileType: {type: [String], default: 'default', maxLength: 50},
		currentFileType: {type: [String], default: 'default', maxLength: 50},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('configuration', configuration)
