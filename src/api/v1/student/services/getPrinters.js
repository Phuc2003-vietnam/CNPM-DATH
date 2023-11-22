import printer from "#~/model/printer.js"

async function getPrinters({
    searchField, 
    status, 
    sortDirection, 
    facility,
    per_page,
    current_page
}) {

    let query = {}
    if(searchField) { query.printerId = {$regex: searchField} }
    if(status==0 || status==1) {query.status = status}
    if(sortDirection!==1 && sortDirection!==-1) { sortDirection = -1 }
    if (facility && (facility === 'CS1' || facility === 'CS2')) {
        query = {
            ...query,
            'location.facility': facility,
        }
    }

    var printers = await printer
        .find(query)
        .select('printerId location status printingJob printingQueue')
    
    //sort
    printers.sort((a, b) => {
        const waiting_a = a.printingJob.length + a.printingQueue.length
        const waiting_b = b.printingJob.length + b.printingQueue.length
        return sortDirection * (waiting_a - waiting_b)
    })
    //pagination
    const startIndex = (current_page - 1) * per_page;
    const endIndex = startIndex + per_page;
    let paginatedPrinters = printers.slice(startIndex, endIndex)

    const modifiedPrinters = paginatedPrinters.map(ele => {

        const jobLength = ele.printingJob ? ele.printingJob.length : 0;
        const queueLength = ele.printingQueue ? ele.printingQueue.length : 0;
    
        return {
            ...ele.toObject(),
            waiting_amount: jobLength + queueLength,
            printingJob: undefined,
            printingQueue: undefined,
        };
    });


    return {
        current_page,
        per_page,
        printers: modifiedPrinters
    };
}

export default getPrinters