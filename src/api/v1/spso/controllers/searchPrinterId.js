import SpsoService from '../services/index.js'

const filterListPrinter = async (req, res, next) => {
	try {
		const printerId = req.params?.printerId
        console.log(printerId);
		const {per_page, current_page} = req
		const data = await new SpsoService().searchPrinterId({
			per_page,
			current_page,
			printerId
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default filterListPrinter
