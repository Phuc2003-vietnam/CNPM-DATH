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
