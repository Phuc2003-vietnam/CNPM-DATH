import printer from '#~/model/printer.js'

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
	if (status != 0 && status != 1) {
		status = 1
	}
	const query={}
	query.status=status;
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
