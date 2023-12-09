import printer from '#~/model/printer.js'

async function searchPrinterId({per_page, current_page, printerId}) {
	if (printerId == undefined) {
		var printers = await printer
			.find({})
			.skip((current_page - 1) * per_page)
			.limit(per_page)
		var totalPrinter = (await printer.find({})).length
	} else {
		var printers = await printer
			.find({printerId: {$regex: printerId}})
			.skip((current_page - 1) * per_page)
			.limit(per_page)
		var totalPrinter = (await printer.find({printerId: {$regex: printerId}})).length
	}
	var data = {
		per_page,
		current_page,
		total_pages: Math.ceil(totalPrinter / per_page),
		totalPrinter,
		printers,
	}
	return data
}

export default searchPrinterId
