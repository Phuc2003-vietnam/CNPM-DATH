import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'

function total_pages(numVersion, pagesPerSheet, document){

    let page_amount = 0
    let flag = (document.pages%pagesPerSheet===0) ? 0:1
    page_amount = (Math.floor(document.pages/pagesPerSheet) + flag) * numVersion
    return page_amount
}

async function getAll_Logs({
    user_id
}){
    const checkUser = await user.findById(user_id)
    if(!checkUser) {
        return Promise.reject({
            status: 404,
            message: "The requested user_id was not found in the database"
          })
    }

    
    //Get all printingLogs of a user
    const logPromises = checkUser.printingLog.map(async (id) => {
        if(!id.match(/^[0-9a-fA-F]{24}$/)) return null

        const checkLog = await printingLog.findById(id)
        return checkLog
    })
    const logs = await Promise.all(logPromises)
    const filteredLogs = logs.filter(ele => ele)

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

export default getAll_Logs