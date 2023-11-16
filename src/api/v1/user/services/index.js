import register from './register.js'
import login from './login.js'
import createToken from './createTokens.js'
import refreshAccessToken from './refreshAccessToken.js'
import getUserInfo from './getUserInfo.js'

class UserService {
	userInfo=null;	//later getUserInfo will assign to userInfo
	register = register
	login = login
	createToken = createToken
	refreshAccessToken = refreshAccessToken
	getUserInfo=getUserInfo
}

export default UserService
