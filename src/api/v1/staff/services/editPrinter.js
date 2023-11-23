import printer from '#~/model/printer.js'

async function editPrinter({printerId, status}) {
	var query={}
	if (status==1||status==0) {
		query.status = status
	}
	const result = await printer.findOneAndUpdate(
		{printerId},
		{$set: {...query}},
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
