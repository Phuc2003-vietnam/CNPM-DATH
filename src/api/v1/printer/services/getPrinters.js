import printer from "#~/model/printer.js"
import printingLog from "#~/model/printingLog.js"

async function getPrinters() {
    
    const printers = await printer.find({ status: 1 }).select('-printingLog');

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

        return {
            ...single.toObject(),
            printingJob: printingJobs,
            printingQueue: printingQueues,
        };
    });

    return Promise.all(printerPromises);
}

export default getPrinters;
