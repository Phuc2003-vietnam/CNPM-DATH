import printingLog from "#~/model/printingLog.js"

async function getLatestComplete(
    PrintingLog
) {
    const printingLogsPromise = PrintingLog.map(async (log_id) => {
        const log = await printingLog.findById(log_id).select('status document paperSize numVersion');
        return log;
    });

    const printingLogs = await Promise.all(printingLogsPromise)

    //TODO
    let latest = printingLogs.filter((log) => (log.status == "Completed"));

    return [latest[latest.length - 1]]
}

export default getLatestComplete