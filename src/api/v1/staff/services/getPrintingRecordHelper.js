import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
async function getPrintingRecordHelper(option, startDate, endDate) {
	const printingQueue = await Promise.all(
		option.map(async (printingLogId) => {
			if (printingLogId != 'default') {
				var printingLogObj = await printingLog
					.findById(printingLogId)
					.select(
						'document status numVersion user_id createdAt -_id'
					)
				var logCreatedAt = new Date(printingLogObj.createdAt)
				if (logCreatedAt >= startDate && logCreatedAt <= endDate) {
					var userObj = await user
						.findById(printingLogObj.user_id)
						.select('firstName lastName mssv -_id')
					// const userobj=userObj.toObject()

					return {...userObj.toObject(), ...printingLogObj.toObject()} //remember to use toObject() otherwise it looks terrible
				} else {
					// Log's createdAt is outside the specified range
					return null
				}
			} else {
				// 'default' value
				return null
			}
		})
	)
	const filteredPrintingQueue = printingQueue.filter((log) => log !== null);
	return filteredPrintingQueue
}
export default getPrintingRecordHelper
