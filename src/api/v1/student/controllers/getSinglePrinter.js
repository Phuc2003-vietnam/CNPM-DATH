const getSinglePrinter = async (req, res, next) => {
    try {
        const {printerId} = req.query
        const data = await req.studentService.getSinglePrinter({printerId})
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default getSinglePrinter