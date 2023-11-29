const detailStudent = async (req, res, next) => {
    try {
        
        const {studentId, start, end, sortDirection} = req.query
        const data = await req.spsoService.detailStudent({
            studentId,
            start,
            end,
            sortDirection: parseInt(sortDirection)
        })
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default detailStudent