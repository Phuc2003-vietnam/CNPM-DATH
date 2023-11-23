import printer from '#~/model/printer.js'
import getPrintingRecordHelper from './getPrintingRecordHelper.js'

async function getPrintingQueue({printerId}) {
	var printerRecord = await printer.findOne({printerId}).select('-printingLog')
	if(!printerRecord)
	{
		return Promise.reject({
			status: 400,
			message: 'Wrong printerId value or not assigned value',
		})
	}
	const printerObject = printerRecord.toObject()
	printerObject.printingQueue = await getPrintingRecordHelper(printerObject.printingQueue) //Join PrintingQueue
	printerObject.printingJob = await getPrintingRecordHelper(printerObject.printingJob) //Join PrintingJob
    return printerObject
}

export default getPrintingQueue
