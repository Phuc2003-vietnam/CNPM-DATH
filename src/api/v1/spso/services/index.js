import UserService from '../../user/services/index.js'
import addPrinter from './addPrinter.js'

class SpsoService extends UserService {
    addPrinter=addPrinter
}
export default SpsoService
