import user from '#~/model/user.js'
import {} from 'dotenv/config'
const access_token_key = process.env.ACCESS_TOKEN_KEY

async function getSpsoStaff({user_id}) {
	try {
		const managerList = await user.find({
			role: {$in: ['staff', 'spso']},
			_id: { $ne: user_id }
		}).select("_id location email firstName lastName role")
		return managerList
	} catch (err) {
		return Promise.reject({status: 500, message: 'System Error'})
	}
}
export default getSpsoStaff
