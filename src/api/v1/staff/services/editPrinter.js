import printer from '#~/model/printer.js'

async function editPrinter({printerId, status}) {
	if (!status) {
		return Promise({
			status: 404,
			message: 'Status of the printer is not defined',
		})
	}
	const result = await printer.findOneAndUpdate(
		{printerId},
		{$set: {status}},
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
