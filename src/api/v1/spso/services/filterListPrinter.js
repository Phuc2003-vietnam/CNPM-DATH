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
	const query = {}
	var str = {}
	if (status == 0 || status == 1) {
		query.status = status
	}
	if (searchField) {
		query.printerId = {$regex: searchField}
	} 
	if (facility) {
		str = {'location.facility': facility}
		query['location.facility'] = facility
	}
	//Find printers
	var printers = await printer 
		.find(query)
		.skip((current_page - 1) * per_page)
		.limit(per_page)
		.sort({activatedTime: sortDirection})
	var totalPrinter = (await printer.find(str)).length //'location.facility': undefind not work as expected
	var activatedPrinter = (await printer.find({status: 1, ...str})).length
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
