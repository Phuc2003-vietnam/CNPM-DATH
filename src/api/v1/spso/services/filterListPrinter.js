import printer from '#~/model/printer.js'
import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'

async function filterListPrinter({
	status,
	sortDirection,
	facility,
	per_page,
	current_page,
	searchField,
}) {
	//handle random sortDirection
	if (sortDirection != 1 && sortDirection != -1) {
		sortDirection = -1
	}
	//handle random status
	// if (status != 0 && status != 1) {
	// 	status = 1
	// }
	const query = {}
	if (status ==0 || status == 1) {
		query.status = status
	}
	if (searchField) {
		query.printerId = {$regex: searchField}
	} //Search for printerId

	if (facility == 'CS1' || facility == 'CS2') {
		var printers = await printer
			.find({...query, 'location.facility': facility})
			.skip((current_page - 1) * per_page)
			.limit(per_page)
			.sort({activatedTime: sortDirection})
		var totalPrinter = (await printer.find({'location.facility': facility})).length
		var activatedPrinter = (
			await printer.find({status: 1, 'location.facility': facility})
		).length
	} else {
		var printers = await printer //get ALL in CS1 and CS2: handle random facility
			.find({...query})
			.skip((current_page - 1) * per_page)
			.limit(per_page)
			.sort({activatedTime: sortDirection})
		var totalPrinter = (await printer.find()).length
		var activatedPrinter = (await printer.find({status: 1})).length
	}


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
				} 
				else { return {}}
			})
		)
		return printingQueue
	}

	//Apply function
	for (var i = 0; i < printers.length; i++) {

		const printerObject = printers[i].toObject()
		printerObject.printingLog = await getprintingQueue(printerObject.printingLog)
		printerObject.printingQueue = await getprintingQueue(printerObject.printingQueue) //Join PrintingQueue
		printerObject.printingJob = await getprintingQueue(printerObject.printingJob) //Join PrintingJob
		printers[i]=printerObject

	}
	
	var data = {
		per_page,
		current_page,
		total_pages: Math.ceil(totalPrinter / per_page),
		totalPrinter,
		activatedPrinter,
		printers,
	}
	return data
}

export default filterListPrinter
