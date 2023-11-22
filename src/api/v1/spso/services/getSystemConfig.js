import configuration from '#~/model/configuration.js'

async function getSystemConfig() {
	const configurationRecord = await configuration.findOne({})
	return configurationRecord
}

export default getSystemConfig
