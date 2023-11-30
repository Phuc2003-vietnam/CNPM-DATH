import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

const access_token_key = process.env.ACCESS_TOKEN_KEY

var io
function initializeSocketServer(httpServer) {
	io = new Server(httpServer, {
		cors: {origin: '*'},
	})

	io.on('connection', (socket) => {
		console.log(`Socket IO connected, user ${socket.id}`)
		socket.emit("check","You are connected to socket io server")
		// socket.on('join-room', (ward_id) => {
		// 	//client socket.emit("join-room", ward_id)
		// 	socket.join(ward_id)
		// })
		// socket.on('notification', (employee_id_list, ward_id) => {
		// 	////client socket.emit("notification", employee_id_list,wardid),
		// 	const data = {
		// 		//employee_id_list lấy được khi gọi api post notification sẽ có return
		// 		type: 'notification',
		// 		state: -1,
		// 		employee_id_list,
		// 	}
		// 	io.to(ward_id).emit('new-notification', data) //sau đó tùy client có employee id thuộc employee id list hay không mà ta sẽ
		// }) //gọi api get number notification. Còn lúc client offline thì khi vào thì bên FE sẽ gọi api get notification rồi nên k lo
	})
	// io.use(async (socket, next) => {
	// 	try {
	// 		if (!socket.handshake.auth.token)
	// 		return next({status: 401, message: 'Unauthorized'})
	// 		const access_token = socket.handshake.auth.token
	// 		const decodedToken = jwt.verify(access_token, access_token_key)
	// 		const employee = await prisma.employee.findUnique({
	// 			where: {employee_id: decodedToken.employee_id},
	// 		})
	// 		if (!employee) next({status: 401, message: 'Unauthorized'})
	// 		next()
	// 	} catch (err) {
	// 		next({status: 401, message: 'Unauthorized'})
	// 	}
	// })
}
export {initializeSocketServer, io}
