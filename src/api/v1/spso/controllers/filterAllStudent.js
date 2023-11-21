import SpsoService from "../services/index.js"

const filterAllStudent = async (req, res, next) => {
    try {

        const {studentId, studentName, sortName, sortPayment} = req.query
        const {per_page, current_page} = req

        const data = await new SpsoService().filterAllStudent({
            studentId, 
            studentName, 
            sortName: parseInt(sortName), 
            sortPayment: parseInt(sortPayment),
            per_page, 
            current_page
        })

        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default filterAllStudent