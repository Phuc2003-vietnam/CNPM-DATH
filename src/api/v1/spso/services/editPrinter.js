import printer from '#~/model/printer.js'

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
	const result = await printer.findOneAndUpdate(
		{printerId},
		{$set: query},
		{returnDocument: 'after'}
	)
	if (result !== null) {
		return result
	} else {
		return Promise.reject({
			status: 404,
			message: 'The printerID is not found',
		})
	}
}

export default editPrinter
