import printer from '#~/model/printer.js'
import getPrintingRecordHelper from './getPrintingRecordHelper.js'
import formatDate from "./formatDate.js"

async function getPrintingLog({printerId,startDate,endDate,location}) {
	//use location to handle case when staff doesnt manage the printer
	var {startDate,endDate}=formatDate({startDate,endDate})
	var printerRecord =  await printer.findOne({location,printerId}).select('-printingJob -printingQueue')
	if(!printerRecord)
	{
		return Promise.reject({
			status: 400,
			message: 'Wrong printerId value or not assigned value or you dont have access to this printer',
		})
	}
	const printerObject = printerRecord.toObject()
	printerObject.printingLog = await getPrintingRecordHelper(printerObject.printingLog,startDate,endDate)
	return printerObject
}

export default getPrintingLog
