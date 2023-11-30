import printer from "#~/model/printer.js"
import printingLog from "#~/model/printingLog.js"
import getLatestComplete from "./getLatestComplete.js"

async function getPrinters() {
    
    const printers = await printer.find({ status: 1 })

    if (!printers) {
        return printers;
    }

    const printerPromises = printers.map(async (single) => {

        //Load printingJob
        const printingJobPromises = single.printingJob.map(async (job_id) => {
            const job = await printingLog.findById(job_id).select('status document paperSize numVersion');
            return job;
        });

        //Load printingQueue
        const printingQueuePromises = single.printingQueue.map(async (queue_id) => {
            const queue = await printingLog.findById(queue_id).select('status document paperSize numVersion');
            return queue;
        });

        //Promise
        const [printingJobs, printingQueues] = await Promise.all([
            Promise.all(printingJobPromises),
            Promise.all(printingQueuePromises),
        ]);

        //Display resolve here !
        let pick = (printingJobs.length > 0) ? printingJobs : await getLatestComplete(single.printingLog)
        let result = {
            ...single.toObject(),
            printingJob: pick,
            printingQueue: printingQueues,
        };
        result.printingLog = undefined

        return result
    });

    return Promise.all(printerPromises);
}

export default getPrinters;
