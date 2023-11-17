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
			document, //fix document to know the size of pages
			printerId,
		} = req.body
		const userInfo = req.studentService.userInfo
		const data = await new StudentService().confirm_print({
			paperSize,
			numVersion,
			colorOption,
			landScapeOption,
			pagesPerSheet,
			document,
			userInfo,
			printerId,
		})

		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

//GETALL_LOGS
export const getAll_Logs = async (req, res, next) => {
	try {
		const userInfo = req.studentService.userInfo
		const data = await new StudentService().getAll_Logs({
			userInfo
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
            searchField,
            status, 
            sortDirection, 
            facility, 
            startDate, 
            endDate
        } = req.query
		
		const userInfo = req.studentService.userInfo
        const {per_page, current_page} = req

        const data = await new StudentService().filterAll_Logs({
            searchField,
            userInfo,
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

export const deleteSingle_Logs = async (req, res, next) => {
	try {
		const {printingLogId} = req.query
		const userInfo = req.studentService.userInfo

		const data = await StudentService().deleteSingle_Logs({
			printingLogId,
			userInfo
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

