import UserService from '../../user/services/index.js'
import addPrinter from './addPrinter.js'
import filterListPrinter from './filterListPrinter.js'
import searchPrinterId from './searchPrinterId.js'
import editPrinter from './editPrinter.js'

class SpsoService extends UserService {
    addPrinter=addPrinter
    filterListPrinter=filterListPrinter
    searchPrinterId=searchPrinterId
    editPrinter=editPrinter
}
export default SpsoService
