//only for developing , testing new user
import user from '#~/model/user.js'

import bcrypt from 'bcrypt'
async function register({
	email,
	password,
	role,
	mssv,
	firstName,
	lastName,
	balance,
	facility,
	department,
	room,
}) {
	const userRecord = await user.findOne({email})
	if (userRecord) {
		return Promise.reject({
			status: 403,
			message: 'The email has been registered',
		})
	} else {
		const saltRounds = 10

		const hashedPassword = await bcrypt.hash(password, saltRounds)

		if (role == 'student') {
			await user.create({
				email,
				password: hashedPassword,
				mssv,
				firstName,
				lastName,
				balance,
			})
		} else if (role == 'spso') {
			await user.create({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				location:{
					facility
				},
			})
		} else if (role == 'staff') {
			await user.create({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				location: {
					facility,
					department,
					room,
				},
			})
		}
	}
}
export default register
