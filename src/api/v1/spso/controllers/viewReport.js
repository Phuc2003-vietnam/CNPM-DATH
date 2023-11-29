const viewReport = async (req, res, next) => {
    try {

        const {year} = req.query
        const data = await req.spsoService.viewReport({year})

        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default viewReport