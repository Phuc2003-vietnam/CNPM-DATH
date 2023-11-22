import printer from '#~/model/printer.js'
import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'

async function filterListPrinter({per_page, current_page, searchField, printerList}) {
	//pre process data 
	var printers = await printer
		.find({printerId: {$in: printerList}})
		.skip((current_page - 1) * per_page)
		.limit(per_page)
	var totalPrinterRecord=await printer.find({
		printerId: {$in: printerList},
	}) 	
	var activatedPrinterRecord = await printer.find({
		printerId: {$in: printerList},
		status: 1,
	})
	var totalPrinter = totalPrinterRecord.length
	var activatedPrinter = activatedPrinterRecord.length
	//ADD queue list : GET the printing log ID in each Printer => get the user ID from printing log => combine them
	async function getprintingQueue(option) {
		const printingQueue = await Promise.all(
			option.map(async (printingLogId) => {
				if (printingLogId != 'default') {
					var printingLogObj = await printingLog
						.findById(printingLogId)
						.select('document.title status numVersion user_id -_id')
					var userObj = await user
						.findById(printingLogObj.user_id)
						.select('firstName lastName mssv -_id')
					// const userobj=userObj.toObject()

					return {...userObj.toObject(), ...printingLogObj.toObject()} //remember to use toObject() otherwise it looks terrible
				} else {
					return {}
				}
			})
		)
		return printingQueue
	}

	//Apply function
	for (var i = 0; i < printers.length; i++) {
		const printerObject = printers[i].toObject()
		printerObject.printingQueue = await getprintingQueue(
			printerObject.printingQueue
		) //Join PrintingQueue
		printerObject.printingJob = await getprintingQueue(printerObject.printingJob) //Join PrintingJob
		printers[i] = printerObject
	}

	var data = {
		per_page,
		current_page,
		totalPrinter,
		total_pages: Math.ceil(totalPrinter / per_page),
		activatedPrinter,
		printers,
	}
	return data
}

export default filterListPrinter
