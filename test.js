const express = require('express')
const multer = require('multer')
const PDFParser = require('pdf-parse')
const path = require('path')
const {DocxCounter, OdtCounter, PdfCounter, PptxCounter} = require('page-count')
const app = express()
const PORT = 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Set up multer for handling file uploads
const checkFileType = function (file, cb) {
	//Allowed file extensions
	const fileTypes = /pdf|/

	//check extension names
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

	const mimeType =
		fileTypes.test(file.mimetype) ||
		file.mimetype ===
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

	if (mimeType && extName) {
		return cb(null, true)
	} else {
        return cb(null, false)

	}
}
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
	charset: 'utf8',
})
// Define the route for handling file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
	console.log('hello')
    console.log(req.file);
	// Access the uploaded file from req.file.buffer
	const fileBuffer = req.file.buffer

	// Convert the buffer to a string before passing it to pdf-parse
	const fileContent = fileBuffer
	const pagesDocx = await DocxCounter.count(fileBuffer)
	console.log(pagesDocx)
	res.json({pagesDocx})
	// Use pdf-parse to parse the PDF and get information
	//     PDFParser(fileContent).then(data => {
	//       const numberOfPages = data.numpages;

	//       res.json({ numberOfPages });
	//     }).catch(error => {
	//       console.error('Error parsing PDF:', error);
	//       res.status(500).json({ error: 'Error parsing PDF' });
	//     });
	//   } catch (err) {
	//     console.error('Error handling file upload:', err);
	//     res.status(500).json({ error: 'Error handling file upload' });
	//   }
})
app.use((error, req, res, next) => {
	console.log(error.message)
	const status = error.status || 500
	const message = error.message
	const data = error.data
	res.status(status).json({message: message, data: data})
})
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
