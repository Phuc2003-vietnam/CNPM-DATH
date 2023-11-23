import printer from '#~/model/printer.js'
import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import configuration from '#~/model/configuration.js'

async function filterListPrinter({per_page, current_page, searchField, location}) {
	//pre process data
	var printers = await printer
		.find({location,printerId: {$regex: searchField}})
		.skip((current_page - 1) * per_page)
		.limit(per_page)
	var totalPrinter=printers.length
	var activatedPrinter=0;
	for (var i=0;i<totalPrinter;i++)
	{
		if(printers[i].status)
		{
			activatedPrinter++;
		}
	}

	const {currentFileType} = await configuration
		.findOne({})
		.select('currentFileType -_id')
	var data = {
		per_page,
		current_page,
		totalPrinter,
		total_pages: Math.ceil(totalPrinter / per_page),
		activatedPrinter,
		printers,
		currentFileType,
	}
	return data
}

export default filterListPrinter
