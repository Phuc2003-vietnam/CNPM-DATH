
const searchPrinterById = async (req, res, next) => {
	try {
		const {searchField} = req.query
		const {per_page, current_page} = req
        const printerList=req.staffService.userInfo.printer
		const data = await req.staffService.searchPrinterById({
			per_page,
			current_page,
			searchField,
            printerList
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default searchPrinterById
