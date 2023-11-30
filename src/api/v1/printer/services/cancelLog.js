import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import printer from '#~/model/printer.js'
import {balance_helper} from '#~/api/v1/student/services/printingLog/confirm_print.js'

async function cancelLog({
    printingLogId
}){

    let log = await printingLog.findOne({_id: printingLogId})

    if(!log){
        return Promise.reject({
            status: 404,
            message: `The document with id ${printingLogId} not found in the database`
        })
    } 

    //If the doc is not InProgress or not Queued, you cannot cancel
    if(log.status !== 'Queued' && log.status !== 'InProgress') {
        return Promise.reject({
            status: 503,
            message: `The document ${log.document.title}.${log.document.fileType} cannot be cancelled, because it was already cancelled or printed!`
        })
    }

    //Find the user assigned with this printingLog
    let userInfo = await user.findById(log.user_id)
    if(!userInfo){
        return Promise.reject({
            status: 404,
            message: `Cannot find the user with user_id: ${log.user_id} - owner of this printingLog with printingLogId: ${log._id.toString()}`
        })
    }
    

    //Return amount
    let pay_amount = balance_helper(
        log.paperSize, 
        log.numVersion,
        log.pagesPerSheet,
        log.document
    )

    //Return balance
    userInfo.balance += pay_amount
    await user.updateOne(
        {_id: userInfo._id.toString()},
        {
            $set: {balance: userInfo.balance}
        }
    )
    
    //Update log status
    await printingLog.updateOne(
        {_id: log._id.toString()},
        {
            $set: {
                status: "Failed",
                finishDate: Date.now()
            }
        }
    )
    
    if(log.status == "InProgress"){
        //Update Job in Printer
        await printer.updateOne(
            {printerId: log.printerId},
            {
                $pull: { printingJob: printingLogId },
                $push: { printingLog: printingLogId }
            }
        )
    } else if(log.status == "Queued") {
        //Update Queue in Printer
        await printer.updateOne(
            {printerId: log.printerId},
            {
                $pull: { printingQueue: printingLogId },
                $push: { printingLog: printingLogId }
            }
        )
    }

    

    let result = {
        user_id: userInfo._id.toString(),
        user_email: userInfo.email,
        return_amount: pay_amount
    }
    return result
}

export default cancelLog