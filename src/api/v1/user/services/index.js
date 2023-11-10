import register from './register.js'
import login from './login.js'
import createToken from './createTokens.js'

class UserService {
    register=register
    login=login
    createToken=createToken
}

export default UserService
