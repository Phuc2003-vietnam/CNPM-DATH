import printer from "#~/model/printer.js";
import printingLog from "#~/model/printingLog.js";

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
        await printer.updateOne(
            {printerId: printerId},
            { 
                $pull: { printingJob: headJobId },
                $push: { printingLog: headJobId}
            }
        )

        await printingLog.updateOne(
            {_id: headJobId},
            {
                $set: { status: "Completed" }
            }
        )

        result.moveJob = {
            id: headJobId,
            status_before: "InProgress",
            status_now: "Completed"
        }
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
    
    if(!result.moveQueue && !result.moveJob){
        return Promise.reject({
            status: 422,
            message: `The printer with printerId: [${printerId}] has nothing to do!`
        })
    }
    return result

}

export default nextJob