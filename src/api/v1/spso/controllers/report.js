import SpsoService from "../services/index.js"

const report = async (req, res, next) => {
    try {

        const {year, month, sortDirection} = req.query
        const {per_page, current_page} = req
        const data = await new SpsoService().report({
            year,
            month,
            sortDirection: parseInt(sortDirection),
            per_page,
            current_page
        })
        res.status(200).json({data})
    } catch(err) {
        next(err)
    }
}

export default report