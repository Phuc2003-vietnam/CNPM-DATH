import printer from "#~/model/printer.js"
import configuration from '#~/model/configuration.js'

async function getSinglePrinter({
    printerId
}) {
	const {currentFileType} = await configuration.findOne({}).select("currentFileType -_id")
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
        currentFileType
    }
}

export default getSinglePrinter