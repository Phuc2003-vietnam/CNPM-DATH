import StudentService from '../services/index.js'

// CONFRIM_PRINT
const confirm_print = async (req, res, next) => {
    try {
        const {
            paperSize, 
            numVersion,
            colorOption,
            landScapeOption,
            pagesPerSheet,
            document, 
            user_id, printerId
        } = req.body

        const data = await new StudentService().confirm_print({
            paperSize, 
            numVersion,
            colorOption,
            landScapeOption,
            pagesPerSheet,
            document, 
            user_id, printerId
        })

        res.status(200).json({data})

    } catch (err) {
        next(err)
    }
}

export default confirm_print

