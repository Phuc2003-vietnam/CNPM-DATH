import UserService from '../../user/services/index.js'
import confirm_print from './printingLog/confirm_print.js'
import deleteSingle_Logs from './printingLog/deleteSingle_Logs.js'
import filterAll_Logs from './printingLog/filterAll_Logs.js'
import getAll_Logs from './printingLog/getAll_Logs.js'
import getSingle_Logs from './printingLog/getSingle_Logs.js'

class StudentService extends UserService {
    confirm_print=confirm_print
    deleteSingle_Logs=deleteSingle_Logs
    filterAll_Logs=filterAll_Logs
    getAll_Logs=getAll_Logs
    getSingle_Logs=getSingle_Logs
}
export default StudentService
