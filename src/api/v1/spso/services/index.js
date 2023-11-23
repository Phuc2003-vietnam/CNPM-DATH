import UserService from '../../user/services/index.js'
import addPrinter from './addPrinter.js'
import filterListPrinter from './filterListPrinter.js'
import searchPrinterId from './searchPrinterId.js'
import editPrinter from './editPrinter.js'
import filterAllStudent from './filterAllStudent.js'
import report from './report.js'
import editSystemConfig from './editSystemConfig.js'
import getSystemConfig from './getSystemConfig.js'
import getPrintingQueue from './getPrintingQueue.js'
import getPrintingLog from './getPrintingLog.js'


class SpsoService extends UserService {
    addPrinter=addPrinter
    filterListPrinter=filterListPrinter
    searchPrinterId=searchPrinterId
    editPrinter=editPrinter
    filterAllStudent=filterAllStudent
    report=report
    editSystemConfig = editSystemConfig
    getSystemConfig=getSystemConfig
    getPrintingQueue=getPrintingQueue
    getPrintingLog=getPrintingLog
}
export default SpsoService
