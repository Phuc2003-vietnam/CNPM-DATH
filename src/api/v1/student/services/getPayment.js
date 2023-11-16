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
	const foundPayment = await payment.find({user_id})
	return foundPayment
}

export default getPayment
