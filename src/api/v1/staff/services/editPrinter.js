import printer from '#~/model/printer.js'
import disablePrinter from '../../printer/services/disablePrinter.js'

async function editPrinter({printerId, status}) {
	var query={}
	if (status==1||status==0) {
		query.status = status
	}

	//Cancel Job and Queue in the printer
	if(status==0) {
		await disablePrinter({printerId})
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
