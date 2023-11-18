import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import printer from '#~/model/printer.js'
import configuration from '#~/model/configuration.js'

export function balance_helper(paperSize, numVersion, pagesPerSheet, document) {
	let pay_amount = 0
	let flag = document.pages % pagesPerSheet === 0 ? 0 : 1
	pay_amount = (Math.floor(document.pages / pagesPerSheet) + flag) * numVersion //default A4

	if (paperSize === 'A3') {
		pay_amount *= 2
	}
	return pay_amount
}

async function confirm_print({
	documents,
	userInfo,
	printerId,
}) {

	//Check printer
	const checkPrinter = await printer.findOne({printerId})
	if (!checkPrinter) {
		return Promise.reject({
			status: 404,
			message: 'The requested printerId was not found in the database',
		})
	} else if (checkPrinter.status !== 1) {
		return Promise.reject({
			status: 503,
			message: 'The printer is currently offline. Please try again later',
		})
	}

	//Check existed configuration
	const getConfig = await configuration.findOne({})
	if (!getConfig) {
		return Promise.reject({
			status: 404,
			message: 'No configuration to check the document type in database',
		})
	}

	//Check accpeted file and numVersion and balance
	const typelist = getConfig.fileType
	let summary_payment = 0

	for (const doc of documents) {

		//Check fileType
		if(!typelist.includes(doc.document.fileType)){
			return Promise.reject({
				status: 415,
				message: `Unsupported Media Type of the document [${doc.document.title}.${doc.document.fileType}]`,
			})
		}

		//Check numVersion
		if (doc.numVersion <= 0) {
			return Promise.reject({
				status: 400,
				message: `The numVersion of [${doc.document.title}.${doc.document.fileType}] has to be more than 0, current: ${doc.numVersion}`,
			})
		}

		const {paperSize, numVersion, pagesPerSheet, document} = doc
		let pay_amount = balance_helper(paperSize, numVersion, pagesPerSheet, document)
		summary_payment += pay_amount

	}

	//Not enough balance
	if(userInfo.balance < summary_payment){
		return Promise.reject({
			status: 503,
			message: `Not enough blance: requested ${summary_payment} but available ${userInfo.balance}`,
		})
	}

	let all_docs = []
	//Passed all
	for (const doc of documents) {
		const {
			paperSize,
			numVersion,
			colorOption,
			landScapeOption,
			pagesPerSheet,
			document
		} = doc

		let singleConfirm = await confirm_print_single({
			paperSize,
			numVersion,
			colorOption,
			landScapeOption,
			pagesPerSheet,
			document,
			userInfo,
			printerId
		})

		all_docs.push(singleConfirm)

	}

	let result = {
		documents: all_docs,
		total_payment: summary_payment
	}
	return result

}

async function confirm_print_single({
	paperSize,
	numVersion,
	colorOption,
	landScapeOption,
	pagesPerSheet,
	document,
	userInfo,
	printerId
}) {
	
	const newPrintingLog = await printingLog.create({

		status: 'Queued', //InProgress, Completed, Failed
		finishDate: null,

		paperSize, //"A4", "A3"
		numVersion,
		colorOption,
		landScapeOption,
		pagesPerSheet,
		document,
		user_id: userInfo._id.toString(),
		printerId
	})

	// Update the user document to associate the new printing log
	let pay_amount = balance_helper(paperSize, numVersion, pagesPerSheet, document)
	userInfo.balance -= pay_amount

	await user.updateOne(
		{_id: userInfo._id.toString()},
		{
			$push: {printingLog: newPrintingLog._id},
			$set: {balance: userInfo.balance},
		}
	)

	// Update the printer document to associate the new printing log
	await printer.updateOne(
		{printerId},
		{
			$push: {printingQueue: newPrintingLog._id},
		}
	)

	return newPrintingLog
}

export default confirm_print
