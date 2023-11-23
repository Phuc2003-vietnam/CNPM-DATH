import printingLog from '#~/model/printingLog.js'
import { total_pages } from './getAll_Logs.js'

async function filterAll_Logs({
    searchField,
    userInfo,
    status, 
    sortDirection, 
    facility, 
    startDate, 
    endDate,
    per_page,
    current_page,
}){
    //set defaults sort
    if (sortDirection != 1 && sortDirection != -1) {
		sortDirection = -1
	}
    // Create a base query for user_id
    let query = { user_id: userInfo._id.toString() }
    if (status) { query.status = status }
    if (searchField !== undefined) {
        query.$or = [
          { 'document.title': { $regex: new RegExp(searchField, 'i') } },
          { 'document.fileType': { $regex: new RegExp(searchField, 'i') } }
        ];
      } //Search for fileName also fileType, applied case-insensitive match

    if (facility && (facility === 'CS1' || facility === 'CS2')) {
        query = {
            ...query,
            'printers.location.facility': facility,
        }
    }

    // Filter by date range if provided
    if (startDate && endDate) {
        query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) }
    }

    // Execute the query and apply sorting and pagination
    const filteredLogs =  await printingLog.aggregate([
        {
            $lookup: {
                from: 'printers',
                localField: 'printerId',
                foreignField: 'printerId',
                as: "printers"
            }
        },
        { $match: query },
        { $sort: { createdAt: sortDirection } },
        { $skip: (current_page - 1) * per_page },
        { $limit: per_page },
        { 
            $project: {
                'printers._id': 0,
                'printers.description': 0,
                'printers.brand': 0,
                'printers.model': 0,
                'printers.printingLog': 0,
                'printers.printingJob': 0,
                'printers.printingQueue': 0,
                'printers.createdAt': 0,
                'printers.updatedAt': 0,
                'printers.__v': 0
            }
        }
    ])

    //COUNT SUMMARY
    let printedA3 = 0
    let printedA4 = 0

    const final_logs = filteredLogs.map(log => {
        let total = total_pages(log.numVersion, log.pagesPerSheet, log.document)

        // if(log.status!== "Completed") return

        if(log.paperSize === "A3"){
            printedA3 += total
        } else if(log.paperSize === "A4"){
            printedA4 += total
        }

        return {
            ...log,
            total_pages: total
        }
    })

    let result = {
        "printedA3": printedA3,
        "printedA4": printedA4,
        "printingLogs": final_logs
    }

    return result

}

export default filterAll_Logs