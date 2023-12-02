import printer from '#~/model/printer.js'
import disablePrinter from '../../printer/services/disablePrinter.js'
import newNotifications from '../../notification/newNotification.js'
import {io} from '#~/config/socketIo.js'

async function editPrinter({printerId, brand, model, location, status, description, userInfo}) {
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
		//Socket io implementation : it will send a signal to all online users connected to server
		const data = {
			message: 'Call the printer list api to fetch printer list =>change printer information',
			reason: "SPSO edit the printer",
			target: 'student spso staff',
		}

		//Notification data
		const notice_data = {
			message: 'Call the notifications list API to fetch => change number unread news and update list news',
			reason: 'SPSO/Staff edit the printer',
			target: 'spso staff'
		}

		//Update Notifications
		await newNotifications({
			userInfo,
			action,
			result
		})

		//Release message
		io.emit('update-printer-list', data)
		io.emit('update-notification-list', notice_data)

		return result

	} else {
		return Promise.reject({
			status: 404,
			message: 'The printerID is not found',
		})
	}
}

export default editPrinter
