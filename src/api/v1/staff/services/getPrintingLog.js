import printer from '#~/model/printer.js'
import getPrintingRecordHelper from './getPrintingRecordHelper.js'

async function getPrintingQueue({printerId}) {
	var printerRecord =  await printer.findOne({printerId}).select('-printingJob -printingQueue')
	if(!printerRecord)
	{
		return Promise.reject({
			status: 400,
			message: 'Wrong printerId value or not assigned value',
		})
	}
	const printerObject = printerRecord.toObject()
	printerObject.printingLog = await getPrintingRecordHelper(printerObject.printingLog)
	return printerObject
}

export default getPrintingQueue
