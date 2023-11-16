import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import balance_helper from './confirm_print.js'

async function deleteSingle_Logs({
    printingLogId,
    userInfo
}){

    let log = await printingLog.findById(printingLogId)
    let pay_amount = balance_helper(
        log.paperSize, 
        log.numVersion,
        log.pagesPerSheet,
        log.document
    )
    //Return balance
    const checkUser = await user.updateOne(
        {_id: userInfo._id},
        {
            $set: {balance: userInfo.balance + pay_amount}
        }
    )
    //Update log status
    const checkLog = await printingLog.updateOne(
        {_id: log._id},
        {
            $set: {status: "Failed"}
        }
    )

    let result = {
        data_log_now: checkLog,
        data_user_now: checkUser
    }
    return result
}

export default deleteSingle_Logs