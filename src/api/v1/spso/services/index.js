import UserService from '../../user/services/index.js'
import addPrinter from './addPrinter.js'
import filterListPrinter from './filterListPrinter.js'

class SpsoService extends UserService {
    addPrinter=addPrinter
    filterListPrinter=filterListPrinter
}
export default SpsoService
