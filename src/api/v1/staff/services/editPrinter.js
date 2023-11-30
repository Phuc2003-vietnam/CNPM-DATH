import printer from '#~/model/printer.js'
import {io} from '#~/config/socketIo.js'

async function editPrinter({printerId, status}) {
	var query = {}
	if (status == 1 || status == 0) {
		query.status = status
	}
	const result = await printer.findOneAndUpdate(
		{printerId},
		{$set: {...query}},
		{returnDocument: 'after'}
	)
	if (result !== null) {
		//Socket io implementation : it will send a signal to all online users connected to server
		const data = {
			message: 'Call the printer list api to fetch printer list =>change printer information',
			target: 'student spso staff',
		}
		io.emit('update-printer-list', data)
		//socket.on("update-printer-list",cb) : cb sẽ gọi api lấy fetch all printers		return result
	} else {
		return Promise.reject({
			status: 404,
			message: 'The printerID is not found',
		})
	}
}

export default editPrinter
