const getPrinters = async (req, res, next) => {
    try {
        const {searchField, status, sortDirection, facility} = req.query
        const {per_page, current_page} = req
        const data = await req.studentService.getPrinters({
            searchField, 
            status: parseInt(status), 
            sortDirection: parseInt(sortDirection), 
            facility,
            per_page,
            current_page
        })
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default getPrinters