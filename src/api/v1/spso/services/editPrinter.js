import printer from '#~/model/printer.js'
import disablePrinter from '../../printer/services/disablePrinter.js'

async function editPrinter({printerId, brand, model, location, status, description}) {
	var query = {}
	if (brand) {
		query.brand = brand
	}
	if (model) {
		query.model = model
	}
	if (location) {
		query.location = location
	}
	if (description) {
		query.description = description
	}
	if (status == 1 || status == 0) {
		query.status = status
	}

	//Cancel Job and Queue in the printer
	if(status==0) {
		await disablePrinter({printerId})
	}

	const result = await printer.findOneAndUpdate(
		{printerId},
		{$set: query},
		{returnDocument: 'after'}
	)
	if (result !== null) {
		const data = {
			message: 'Call the printer list api to fetch printer list =>change printer information',
			target: 'student spso staff',
		}
		io.emit('update-printer-list', data)
		return result
	} else {
		return Promise.reject({
			status: 404,
			message: 'The printerID is not found',
		})
	}
}

export default editPrinter
