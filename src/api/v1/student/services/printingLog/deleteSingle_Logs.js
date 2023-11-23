import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import printer from '#~/model/printer.js'
import {balance_helper} from './confirm_print.js'

async function deleteSingle_Logs({
    printingLogId,
    userInfo
}){

    let log = await printingLog.findOne({_id: printingLogId})

    if(!log){
        return Promise.reject({
            status: 404,
            message: `The document with id ${printingLogId} not found in the database`
        })
    } 

    //If the doc is printing, you cannot cancel
    if(log.status === 'InProgress'){
        return Promise.reject({
            status: 503,
            message: `The document ${log.document.title}.${log.document.fileType} cannot be cancelled, because it is being in progress!`
        })
    } else if(log.status !== 'Queued') {
        return Promise.reject({
            status: 503,
            message: `The document ${log.document.title}.${log.document.fileType} cannot be cancelled, because it was already cancelled or printed!`
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
    

    //Update Queue in Printer
    await printer.updateOne(
        {printerId: log.printerId},
        {
            $pull: { printingQueue: printingLogId },
            $push: { printingLog: printingLogId }
        }
    )
    

    let result = {
        return_amount: pay_amount
    }
    return result
}

export default deleteSingle_Logs