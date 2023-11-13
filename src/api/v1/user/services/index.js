import register from './register.js'
import login from './login.js'
import createToken from './createTokens.js'
import refreshAccessToken from './refreshAccessToken.js'
class UserService {
	register = register
	login = login
	createToken = createToken
	refreshAccessToken = refreshAccessToken
}

export default UserService
