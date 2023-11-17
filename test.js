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
})
