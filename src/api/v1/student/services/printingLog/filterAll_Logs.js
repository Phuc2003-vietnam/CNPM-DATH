import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import { total_pages } from './getAll_Logs.js'

async function filterAll_Logs({
    searchField,
    user_id,
    status, 
    sortDirection, 
    facility, 
    startDate, 
    endDate,
    per_page,
    current_page,
}){
    const checkUser = await user.findById(user_id)
    if(!checkUser) {
        return Promise.reject({
            status: 404,
            message: `The requested user_id was not found in the database ${user_id}`,
          })
    }

    //set defaults sort
    if (sortDirection != 1 && sortDirection != -1) {
		sortDirection = -1
	}

    // Create a base query for user_id
    let query = { user_id: user_id }
    if (status) { query.status = status }
    if (searchField) {query.printerId = {$regex: searchField}} //Search for printerId
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
        { $limit: per_page }
    ])

    //COUNT SUMMARY
    let printedA3 = 0
    let printedA4 = 0

    filteredLogs.forEach(log => {
        let total = total_pages(log.numVersion, log.pagesPerSheet, log.document)

        if(log.status!== "Completed") return

        if(log.paperSize === "A3"){
            printedA3 += total
        } else if(log.paperSize === "A4"){
            printedA4 += total
        }
    })

    let result = {
        "printedA3": printedA3,
        "printedA4": printedA4,
        "printingLogs": filteredLogs
    }

    return result

}

export default filterAll_Logs