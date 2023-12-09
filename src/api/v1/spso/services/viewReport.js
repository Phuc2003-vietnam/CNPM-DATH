import printingLog from "#~/model/printingLog.js";

function printed_pages(paperSize, numVersion, pagesPerSheet, document) {
	let pay_amount = 0
	let flag = document.pages % pagesPerSheet === 0 ? 0 : 1
	pay_amount = (Math.floor(document.pages / pagesPerSheet) + flag) * numVersion

	return pay_amount
}

async function viewReport({
    year
}) {

    if(!year){
        return Promise.reject({
            status: 503,
            message: "year query is required!"
        })
    }

    //Setup query
    let startOfYear = new Date(`${year}-01-01`);
    let endOfYear = new Date(`${parseInt(year) + 1}-01-01`);

    let query = {
        status: "Completed",
        finishDate: {
            $gte: startOfYear,
            $lt: endOfYear
        }
    }
    //Start query
    const getLogs = await printingLog.find(query)

    //Setup result
    let result = {}
    for(let month = 1; month <= 12; month++){
        result[`${month}-${year}`] = 0
    }
    //Start result
    getLogs.forEach((log) => {

        if(!log.finishDate) return

        const logMonthYear = `${log.finishDate.getMonth() + 1}-${log.finishDate.getFullYear()}`;
        let monthlyEntry = result[logMonthYear]

        if(monthlyEntry === undefined) return
        result[logMonthYear] += log.paperSize === 'A3' ? printed_pages(log.paperSize, log.numVersion, log.pagesPerSheet, log.document) : 0;
        result[logMonthYear] += log.paperSize === 'A4' ? printed_pages(log.paperSize, log.numVersion, log.pagesPerSheet, log.document) : 0;
    })

    return result

}

export default viewReport