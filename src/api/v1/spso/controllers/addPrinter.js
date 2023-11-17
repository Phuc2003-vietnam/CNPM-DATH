import SpsoService from '../services/index.js'

const addPrinter = async (req, res, next) => {
	try {
		const {printerId, brand, model, location, status, description} = req.body
		const data = await req.spsoService.addPrinter({
			printerId,
			brand,
			model,
			location,
			status,
			description,
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default addPrinter
