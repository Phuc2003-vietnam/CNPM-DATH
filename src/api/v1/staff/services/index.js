import UserService from '../../user/services/index.js'
import searchPrinterById from './searchPrinterById.js'
import editPrinter from './editPrinter.js'
import getPrintingQueue from './getPrintingQueue.js'
import getPrintingLog from './getPrintingLog.js'

class StaffService extends UserService {
    searchPrinterById=searchPrinterById
    editPrinter=editPrinter
    getPrintingQueue=getPrintingQueue
    getPrintingLog=getPrintingLog
}
export default StaffService
