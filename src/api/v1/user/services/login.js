import bcrypt from 'bcrypt'
import user from '#~/model/user.js'
import createToken from './createTokens.js'

async function login({email, password}) {
    const userRecord = await user.findOne({email})
    if (!userRecord) {
		return Promise.reject({
			status: 401,
			message: 'Email not correct',
		})
	} else{
        const isPasswordRight= await bcrypt.compare(password,userRecord.password)
        if(isPasswordRight)
        {
            return await createToken(userRecord._id)
        }
        else{
            return Promise.reject({
                status: 404,
                message: 'Password not correct',
            })
        }
    }
}

export default login
