import payment from '#~/model/payment.js'
import user from '#~/model/user.js'

function createEndDate() {
	var today = new Date()
	var dd = String(today.getDate()).padStart(2, '0')
	var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
	var yyyy = today.getFullYear()

	today = yyyy + '-' + mm + '-' + dd + 'T23:59:59'
	return new Date(today)
}
async function paymentHandler({money, user_id}) {
	//Handle việc endDate hết hạn thì xóa record.Tuy nhiên vẫn xót case vừa mới tạo đã hết hạn nhưng
	// sẽ được giải quyết ở getPayment
	if (money <= 0) {
		return Promise.reject({
			status: 400,
			message: 'Invalid money value. Please check whether it is larger than 0',
		})
	}
	const allPaymentRecord = await payment.find({user_id})
	allPaymentRecord.forEach(async (paymentRecord) => {
		const today = new Date()
		if (paymentRecord.endDate < today) {
			await payment.deleteOne({_id: paymentRecord._id})
		}
	})
	//handle auto increment for stt
	const paymentRecord = await payment.findOne({user_id}).sort({createdAt: -1})
	var stt = 0
	if (!paymentRecord) {
		stt = 1
	} else {
		stt = paymentRecord.stt + 1
	}
	//create a payment record
	const createdPayment = await payment.create({
		stt,
		shortContent: 'SSPS231',
		money,
		paidMoney: 0,
		leftMoney: money,
		endDate: createEndDate(),
		user_id,
	})
	//add payment record id to student
	await user.findOneAndUpdate(
		{_id: user_id},
		{$push: {payment: createdPayment._id}},
		{returnDocument: 'after'}
	)
	return createdPayment
}

export default paymentHandler
