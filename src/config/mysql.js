import mysql from 'mysql'
import {} from 'dotenv/config'

const database = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	port: process.env.DATABASE_PORT,
})

database.connect(function (err) {
	if (err) console.log(err)
	console.log(
		`Connected database ${process.env.DATABASE_NAME} at ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`
	)
})

export default database
