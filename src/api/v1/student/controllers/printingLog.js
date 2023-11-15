import StudentService from '../services/index.js'

// CONFRIM_PRINT
export const confirm_print = async (req, res, next) => {
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

export const getAll_Logs = async (req, res, next) => {
    try {
        const {user_id} = req.body
        const data = await new StudentService().getAll_Logs({
            user_id
        })

        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

