import printer from '#~/model/printer.js'
import getPrintingRecordHelper from './getPrintingRecordHelper.js'
import formatDate from "./formatDate.js"

async function getPrintingQueue({printerId,startDate,endDate}) {
	var {startDate,endDate}=formatDate({startDate,endDate})
	var printerRecord = await printer.findOne({printerId}).select('-printingLog')
	if(!printerRecord)
	{
		return Promise.reject({
			status: 400,
			message: 'Wrong printerId value or not assigned value',
		})
	}
	const printerObject = printerRecord.toObject()
	printerObject.printingQueue = await getPrintingRecordHelper(printerObject.printingQueue,startDate,endDate) //Join PrintingQueue
	printerObject.printingJob = await getPrintingRecordHelper(printerObject.printingJob,startDate,endDate) //Join PrintingJob
    return printerObject
}

export default getPrintingQueue
