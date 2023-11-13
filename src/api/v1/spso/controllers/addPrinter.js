import SpsoService from '../services/index.js'

const addPrinter = async (req, res, next) => {
	try {
        console.log(req.body)
		const {printerId, brand, model, location, status, description} = req.body
		const data = await new SpsoService().addPrinter({
			printerId,
			brand,
			model,
			location,
			status,
			description,
		})
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
}

export default addPrinter
