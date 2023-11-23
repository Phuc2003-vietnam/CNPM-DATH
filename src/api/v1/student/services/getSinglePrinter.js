import printer from "#~/model/printer.js"

async function getSinglePrinter({
    printerId
}) {

    //Null printerId
    if(printerId === undefined){
        return Promise.reject({
            status: 404,
            message: "printerId is required!"
        })
    }
    const targetPrinter = await printer
        .findOne({ printerId: printerId })
        .select('printerId location status printingJob printingQueue')

    //Not found
    if(!targetPrinter){
        return Promise.reject({
            status: 404,
            message: `The requested printer with printerId: [${printerId}] was not found!`
        })
    }

    //filter result
    const jobLength = targetPrinter.printingJob ? targetPrinter.printingJob.length : 0
    const queueLength = targetPrinter.printingQueue ? targetPrinter.printingQueue.length : 0

    return {
        ...targetPrinter.toObject(),
        waiting_amount: jobLength + queueLength,
        printingJob: undefined,
        printingQueue: undefined,
    }
}

export default getSinglePrinter