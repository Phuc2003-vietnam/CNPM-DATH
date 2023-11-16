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

//GETALL_LOGS
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

//FILTERALL_LOGS
export const filterAll_Logs = async (req, res, next) => {
    try {

        const {
            status, 
            sortDirection, 
            facility, 
            startDate, 
            endDate
        } = req.query
        const {user_id} = req.body
        const {per_page, current_page} = req

        const data = await new StudentService().filterAll_Logs({
            user_id,
            status, 
            sortDirection: parseInt(sortDirection), 
            facility, 
            startDate, 
            endDate,
            per_page,
            current_page
        })

        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

