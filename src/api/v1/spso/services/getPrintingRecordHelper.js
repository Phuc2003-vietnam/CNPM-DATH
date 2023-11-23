import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
async function getPrintingRecordHelper(option) {
	const printingQueue = await Promise.all(
		option.map(async (printingLogId) => {
			if (printingLogId != 'default') {
				var printingLogObj = await printingLog
					.findById(printingLogId)
					.select('document.title status numVersion user_id -_id')
				var userObj = await user
					.findById(printingLogObj.user_id)
					.select('firstName lastName mssv -_id')
				// const userobj=userObj.toObject()

				return {...userObj.toObject(), ...printingLogObj.toObject()} //remember to use toObject() otherwise it looks terrible
			} else {
				return {}
			}
		})
	)
	return printingQueue
}
export default getPrintingRecordHelper