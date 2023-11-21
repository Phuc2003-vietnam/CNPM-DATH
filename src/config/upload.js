import multer from 'multer-utf8'
import {} from 'dotenv/config'
import path from 'path'
import {DocxCounter, OdtCounter, PdfCounter, PptxCounter} from 'page-count'
import configuration from '#~/model/configuration.js'

const checkFileType = async function (file, cb) {
	//get the file type from configuration / not yet handle how configuration works
	const config = (await configuration.find({}).sort({updatedAt: -1}))[0]
    var fileType=''
	for (var i = 0; i < config.fileType.length; i++) {
		if (i != config.fileType.length - 1) {
			fileType += config.fileType[i] + '|'
		} else {
			fileType += config.fileType[i]
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
	const pages = 0
	if (fileType == 'docx') {
		const pages = await DocxCounter.count(fileBuffer)
	} else if (fileType == 'pdf') {
		const pages = await PdfCounter.count(fileBuffer)
	}
	return pages
}
const uploadMultiple = function (req, res, next) {
	try {
		upload.array('file')(req, res, (err) => {
			//Input validation for valid files
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
			//Add the document field for each file
			for (var i = 0; i < req.files.length; i++) {
				var title = req.files[i].originalname
				var fileType = getFileType(title)
				var pages = getFilePages(req.files[i], fileType)
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
