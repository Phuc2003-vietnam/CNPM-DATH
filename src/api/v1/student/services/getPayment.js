import payment from '#~/model/payment.js'

async function getPayment({user_id}) {
	//Handle việc endDate hết hạn thì xóa record.
	const allPaymentRecord = await payment.find({user_id})
	allPaymentRecord.forEach(async (paymentRecord) => {
		const today = new Date()
		if (paymentRecord.endDate < today) {
			await payment.deleteOne({_id: paymentRecord._id})
		}
	})
	//find payment list
	// const foundPayment = await payment.find({user_id})
	const foundPayment = await payment.aggregate([
		{
		  $match: {
			user_id: user_id.toString(),
		  },
		},
		{
		  $addFields: {
			payment_id: '$_id', // Create a new field payment_id with the value of _id
		  },
		},
		{
		  $project: {
			_id: 0, // Exclude the original money field
		  },
		},
	  ]);
	  

	console.log(foundPayment)
	return foundPayment
}

export default getPayment
