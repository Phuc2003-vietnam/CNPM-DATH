import configuration from '#~/model/configuration.js'

async function editSystemConfig({
	currentBalance,
	startDate1,
	startDate2,
	currentA4Price,
	currentFileType,
	isDefault = false,
}) {
	var query = {}
	var result = {}
	if (!isDefault) {
		if (currentBalance) {
			if(currentBalance<=0)
			{
				return Promise.reject({
					status: 400,
					message: 'currentBalance value is < 0',
				})
			}
			query.currentBalance = currentBalance
		}
		if (startDate1) {
			query.startDate1 = new Date(startDate1)
		}
		if (startDate2) {
			query.startDate2 = new Date(startDate2)
		}
		if (currentFileType) {
			query.currentFileType = currentFileType
		}
		if (currentA4Price) {
			query.currentA4Price = currentA4Price
			return Promise.reject({
				status: 400,
				message: 'currentA4Price value is < 0',
			})
		}
		result = await configuration.findOneAndUpdate(
			{},
			{$set: query},
			{returnDocument: 'after'}
		)
	} else {
		const {defaultA4Price,defaultBalance,defaultFileType}= await configuration.findOne({}).select("defaultA4Price defaultBalance defaultFileType")
		result = await configuration.findOneAndUpdate(
			{},
			{
				$set: {
					currentA4Price: defaultA4Price,
					currentBalance: defaultBalance,
					currentFileType: defaultFileType,
				},
			},
			{returnDocument: 'after'}
		)
	}
	return result
}

export default editSystemConfig
