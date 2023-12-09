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
	if (status === 0 || status === 1) {
		query.status = status
	}
	if (searchField) {
		query.printerId = {$regex: searchField}
	}
	if (facility) {
		query['location.facility'] = facility
	}
	//Find printers
	var printers = await printer
		.find(query)
		.skip((current_page - 1) * per_page)
		.limit(per_page)
		.sort({activatedTime: sortDirection})
	var totalPrinter = printers.length
	var activatedPrinter = 0
	for (var i = 0; i < printers.length; i++) {
		if (printers[i].status) {
			activatedPrinter++
		}
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
