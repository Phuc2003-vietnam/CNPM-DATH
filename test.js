class UserService {
	userInfo = 3 //later getUserInfo will assign to userInfo
	
}
class StudentService extends UserService {
}
const a = new UserService()
console.log(a.userInfo)
