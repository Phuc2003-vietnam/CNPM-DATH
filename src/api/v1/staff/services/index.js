import UserService from '../../user/services/index.js'
import searchPrinterById from './searchPrinterById.js'

class StaffService extends UserService {
    searchPrinterById=searchPrinterById
}
export default StaffService
