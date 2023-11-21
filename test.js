<<<<<<< HEAD
import express from 'express'
import EventEmitter from 'events'
const eventEmitter = new EventEmitter()
import {Worker} from 'worker_threads'

const app = express()
const port = 3000

const requestBuffer = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/buffer-request', (req, res) => {
	const {requestData} = req.body
	requestBuffer.push(requestData)
	const worker = new Worker('./test2.js')
	worker.postMessage({ data: 5 });

	console.log('Request buffered:', requestData)

	worker.on('message', (message) => {
		console.log('Message from worker thread:', message)
	})
	console.log('hello')
	res.json({message: 'Request buffered successfully'})
})

app.get('/get-buffered-requests', (req, res) => {
	res.json({bufferedRequests: requestBuffer})
})
// eventEmitter.emit('newData', requestData)

// eventEmitter.on('newData', (data) => {
// 	console.log('New data added to buffer:', data)
// })
app.get('/get-buffered-requests', (req, res) => {
	while (requestBuffer.length != 0) res.json({bufferedRequests: requestBuffer})
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
=======
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
>>>>>>> f593d1c7212d67793db4649172d7de8cdcc94f32
})
