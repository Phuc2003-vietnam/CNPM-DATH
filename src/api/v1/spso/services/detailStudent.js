import printingLog from "#~/model/printingLog.js";
import { balance_helper } from "../../student/services/printingLog/confirm_print.js";

async function detailStudent({
    studentId,
    start,
    end,
    sortDirection
}) {

    if(studentId === undefined){
        return Promise.reject({
            status: 503,
            message: "The studentId is required!"
        })
    }

    if(sortDirection!==-1 && sortDirection!==1) { sortDirection = -1 }
    let query = {}
    query.user_id = studentId
    query.$or = [
        {status: "Completed"},
        {status: "Failed"}
    ]

    if(start && end){
        query.finishDate = {
            $gte: new Date(start),
            $lte: new Date(end)
        }
    }

    const allLogs = await printingLog
        .find(query)
        .select('user_id printerId finishDate status document numVersion paperSize pagesPerSheet')
        .sort({finishDate: sortDirection})

    allLogs.forEach((log) => {
        const {document, numVersion, paperSize, pagesPerSheet} = log
        const printed = balance_helper(paperSize, numVersion, pagesPerSheet, document)

        log.total_pages = printed
        log.pagesPerSheet = undefined
    })

    return allLogs
}

export default detailStudent