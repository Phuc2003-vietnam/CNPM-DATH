import printer from '#~/model/printer.js'
import cancelLog from './cancelLog.js'
import {sendMail} from '#~/config/sendMail.js'
import {} from 'dotenv/config'

async function disablePrinter({
	printerId
}) {
	// Check targetPrinter
	let targetPrinter = await printer.findOne({printerId: printerId})
	if (!targetPrinter) {
		throw {
			status: 404,
			message: `The printer to be disabled was not found, printerId: [${printerId}]`,
		}
	}

	// Extract printing job and queue
	let {printingJob, printingQueue} = targetPrinter
	let toBeCancel = printingJob.concat(printingQueue)

	// Use map to create an array of promises for canceling logs
	let cancelLogPromises = toBeCancel.map(async (printingLogId) => {
		let singleResult = await cancelLog({printingLogId})

		return {
			printingLogId: printingLogId,
			user_id: singleResult.user_id,
			user_email: singleResult.user_email,
			document_title: singleResult.document_title,
			return_amount: singleResult.return_amount
		}
	})

	// Wait for all promises to resolve
	let result = await Promise.all(cancelLogPromises)

	// Send emails to users
	let emailPromises = result.map(async (info) => {
		const emailData = {
			//   email: info.user_email,
			email: process.env.MAIL_LIST,
			header: 'Hủy in ấn',
			content: `
			<h4 style="color: red">Tài liệu của bạn: ${info.document_title} bị hủy vì máy in đã bị vô hiệu hóa !!!</h4>
			<p>Liên hệ Hưng đẹp trai để xử lí nhé SIUU</p>
			`,
		}

		await sendMail(emailData)
	})

	// Wait for all email promises to resolve
	await Promise.all(emailPromises)

	return result
}

export default disablePrinter
