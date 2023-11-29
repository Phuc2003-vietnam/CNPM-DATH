
const searchPrinterById = async (req, res, next) => {
	try {
		const {searchField} = req.query
		const {per_page, current_page} = req
        const location=req.staffService.userInfo.location
		const data = await req.staffService.searchPrinterById({
			per_page,
			current_page,
			searchField,
            location,
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default searchPrinterById
