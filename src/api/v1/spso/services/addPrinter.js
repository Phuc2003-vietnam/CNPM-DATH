import printer from '#~/model/printer.js'

async function addPrinter({printerId, brand, model, location, status, description}) {
	const data = await printer.findOne({printerId})
	if (!data) {
		const record=await printer.create({printerId, brand, model, location, status, description})
        console.log(record);
        return record
	}
    else {
        return Promise.reject({
			status: 403,
			message: 'The ID has already bean used',
		})
    }
	
}

export default addPrinter
