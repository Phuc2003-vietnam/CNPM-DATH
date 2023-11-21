import payment from '#~/model/payment.js'
import user from '#~/model/user.js'

async function BKpayHandler({payment_id, user_id}) {
	console.log(user_id)
	//Update the payment record for this payment_id
	var paymentRecord = await payment.findOne({user_id, _id: payment_id})
	if (!paymentRecord.isPaid) {
		paymentRecord.paidMoney = paymentRecord.leftMoney
		paymentRecord.leftMoney = 0
		paymentRecord.isPaid = true
		paymentRecord.paidDate = new Date()
		//Update the balance for student
		var userRecord = await user.findOne({_id: user_id})
		userRecord.balance += paymentRecord.paidMoney / 1000
		console.log(userRecord.balance)
		await user.findOneAndUpdate({_id: user_id}, userRecord, {
			returnDocument: 'after',
		})
	}
	return await payment.findOneAndUpdate({user_id, _id: payment_id}, paymentRecord, {
		returnDocument: 'after',
	})
}

export default BKpayHandler
