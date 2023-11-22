import printer from '#~/model/printer.js'
import user from '#~/model/user.js'

async function addPrinter({printerId, brand, model, location, status, description}) {
	if (location.facility != 'CS1' && location.facility != 'CS2') {
		return Promise.reject({
			status: 400,
			message: 'Wrong facility value',
		})
	}
	const data = await printer.findOne({printerId})
	if (!data) {
		const printerRecord = await printer.create({
			printerId,
			brand,
			model,
			location,
			status,
			description,
		})
		//push the printer ID to relevant staff printer list
		await user.updateMany(
			{location, role: 'staff'},
			{$push: {printer: printerRecord.printerId}}
		)
		return printerRecord
	} else {
		return Promise.reject({
			status: 403,
			message: 'The ID has already been used',
		})
	}
}

export default addPrinter
