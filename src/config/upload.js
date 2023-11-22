import multer from 'multer-utf8'
import {} from 'dotenv/config'
import path from 'path'
import {DocxCounter, OdtCounter, PdfCounter, PptxCounter} from 'page-count'
import configuration from '#~/model/configuration.js'

const checkFileType = async function (file, cb) {
	//get the file type from configuration / not yet handle how configuration works
	const config = (await configuration.find({}))[0]
	var fileType = ''
	for (var i = 0; i < config.currentFileType.length; i++) {
		if (i != config.currentFileType.length - 1) {
			fileType += config.currentFileType[i] + '|'
		} else {
			fileType += config.currentFileType[i]
		}
	}
	const allowedFileType = new RegExp(fileType)
	//check extension names
	const extName = allowedFileType.test(path.extname(file.originalname).toLowerCase())

	const mimeType =
		allowedFileType.test(file.mimetype) ||
		file.mimetype ===
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

	if (mimeType && extName) {
		return cb(null, true)
	} else {
		return cb(new Error('Invalid file type'))
	}
}

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
	charset: 'utf8',
})

const getFileType = (fileName) => {
	const lastDotIndex = fileName.lastIndexOf('.')
	const fileType = fileName.substring(lastDotIndex + 1)
	return fileType
}
const getFilePages = async (file, fileType) => {
	const fileBuffer = file.buffer
	var pages = 0
	if (fileType == 'docx') {
		 pages = await DocxCounter.count(fileBuffer)
	} else if (fileType == 'pdf') {
		 pages = await PdfCounter.count(fileBuffer)
	}
	return pages
}
const isString = (str) => {
	try {
		const a = JSON.parse(str)
		console.log(a)
	} catch (e) {
		return false
	}
	return true
}
const uploadMultiple = function (req, res, next) {
	try {
		upload.array('file')(req, res, async(err) => {
			// Input validation for valid files
			if (err) {
				return next({
					status: 400,
					message: err.message, //err message from checkFileType
				})
			}
			if (!req.files.length) {
				return next({
					status: 400,
					message: 'No file received',
				})
			}
			//Check if documents passed as string => change to JSON
			var documents= req.body.documents
			if (isString(documents)) {
				req.body.documents = JSON.parse(documents)
				console.log(req.body.documents);
			}
			// Add the document field for each file
			// console.log(req.body.documents);
			for (var i = 0; i < req.files.length; i++) {
				var title = req.files[i].originalname
				var fileType = getFileType(title)
				var pages = await getFilePages(req.files[i], fileType)
				// console.log(req.body.documents)
				req.body.documents[i].document = {
					title,
					pages,
					fileType,
				}
			}
			next()
		})
	} catch (err) {
		next(err)
	}
}

export {uploadMultiple}
