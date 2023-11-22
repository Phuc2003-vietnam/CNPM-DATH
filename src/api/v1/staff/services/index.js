import UserService from '../../user/services/index.js'
import searchPrinterById from './searchPrinterById.js'
import editPrinter from './editPrinter.js'

class StaffService extends UserService {
    searchPrinterById=searchPrinterById
    editPrinter=editPrinter
}
export default StaffService
