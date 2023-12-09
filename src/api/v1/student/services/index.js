import UserService from '../../user/services/index.js'
import confirm_print from './printingLog/confirm_print.js'
import deleteSingle_Logs from './printingLog/deleteSingle_Logs.js'
import filterAll_Logs from './printingLog/filterAll_Logs.js'
import getAll_Logs from './printingLog/getAll_Logs.js'
import getSingle_Logs from './printingLog/getSingle_Logs.js'
import paymentHandler from './paymentHandler.js'
import getPayment from './getPayment.js'
import BKpayHandler from './BKpayHandler.js'
import getPrinters from './getPrinters.js'
import getSinglePrinter from './getSinglePrinter.js'

class StudentService extends UserService {
    confirm_print=confirm_print
    deleteSingle_Logs=deleteSingle_Logs
    filterAll_Logs=filterAll_Logs
    getAll_Logs=getAll_Logs
    getSingle_Logs=getSingle_Logs
    paymentHandler=paymentHandler
    getPayment=getPayment
    BKpayHandler=BKpayHandler
    getPrinters=getPrinters
    getSinglePrinter=getSinglePrinter
}
export default StudentService
