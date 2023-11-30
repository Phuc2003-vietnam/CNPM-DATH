import printer from "#~/model/printer.js";
import printingLog from "#~/model/printingLog.js";
import user from '#~/model/user.js';
import { sendMail } from "#~/config/sendMail.js";
import {} from 'dotenv/config'

async function sendToUser({
    user_id,
    document
}) {
    const targetUser = await user.findById(user_id)
    if(!targetUser) return

    const emailData = {
        //   email: targetUser.email,
        email: process.env.MAIL_LIST,
        header: 'Finish document',
        content: `
            <h1 style="color: green">Your file name: ${document.title} has printed successfully!</h1>
        `,
    }

    await sendMail(emailData)
}

async function nextJob({
    printerId
}) {

    //Check printerId
    const checkPrinter = await printer.findOne({printerId})
    if(!checkPrinter){
        return Promise.reject({
            status: 404,
            message: `No printer with printerId: [${printerId}] exist!`
        })
    }

    if(checkPrinter.status === 0){
        return Promise.reject({
            status: 422,
            message: `The printer with printerId: [${printerId}] is not enabled!`
        })
    }

    let Jobs = checkPrinter.printingJob
    let Queues = checkPrinter.printingQueue
    let result = {}

    //Exist printingJob 
    if(Jobs.length > 0){

        let headJobId = Jobs[0]

        let checkLog = await printingLog.findById(headJobId)

        // Have to move now
        if(checkLog.status === "Completed"){

            await printer.updateOne(
                {printerId: printerId},
                { 
                    $pull: { printingJob: headJobId },
                    $push: { printingLog: headJobId}
                }
            )
            // Send email to user
            const {user_id, document} = checkLog
            await sendToUser({user_id, document})

        } // Dont move, change status first
        else if (checkLog.status === "InProgress"){

            await printingLog.updateOne(
                {_id: headJobId},
                {
                    $set: { 
                        status: "Completed",
                        finishDate: new Date()
                    }
                    
                }
            )

            result.move = {
                id: headJobId,
                status_before: "InProgress",
                status_now: "Completed"
            }
            return result
        }

        result.moveJob = {
            id: headJobId,
            status_before: "InProgress",
            status_now: "Completed"
        }
        // return result

    }

    //Exist printigQueue
    if(Queues.length > 0){

        let headQueueId = Queues[0]

        await printer.updateOne(
            {printerId: printerId},
            { 
                $pull: { printingQueue: headQueueId },
                $push: { printingJob: headQueueId}
            }
        )

        await printingLog.updateOne(
            {_id: headQueueId},
            {
                $set: { status: "InProgress" }
            }
        )

        result.moveQueue = {
            id: headQueueId,
            status_before: "Queued",
            status_now: "InProgress"
        }
    }
    
    if(!result.moveJob && !result.moveQueue){
        return Promise.reject({
            status: 422,
            message: `The printer with printerId: [${printerId}] has nothing to do!`
        })
    }
    return result

}

export default nextJob