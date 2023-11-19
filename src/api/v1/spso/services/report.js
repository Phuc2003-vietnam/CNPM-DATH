import printer from '#~/model/printer.js'
import printingLog from '#~/model/printingLog.js'

//Function to calculate numper_of_pages will be printed for each printingLog
function printed_pages(paperSize, numVersion, pagesPerSheet, document) {
	let pay_amount = 0
	let flag = document.pages % pagesPerSheet === 0 ? 0 : 1
	pay_amount = (Math.floor(document.pages / pagesPerSheet) + flag) * numVersion

	return pay_amount
}

async function report({
    year, 
    month, 
    sortDirection, 
    per_page, 
    current_page
}) 
{
	if (sortDirection !== 1 && sortDirection !== -1) {
		sortDirection = -1
	}

	let log_status = 'Queued' // True value is completed

	// Step 1: List of Printers with Additional Information
	const printers = await printer
		.find()
		.select('_id printerId printingLog location')
		.limit(per_page)
		.skip((current_page - 1) * per_page)
    
    //Pre count
    let sumA4 = 0
    let sumA3 = 0
    let sumPrinted = 0

	// Step 2: Printer Information by Year/Month
	const filteredPrinters = printers.map(async (singlePrinter) => {
		const createdAtFilter = {};

        if (year) {
            createdAtFilter.$expr = { $eq: [{ $year: "$createdAt" }, year] };
        }

        if (month) {
            createdAtFilter.$expr = { $eq: [{ $month: "$createdAt" }, month] };
        }

        if (year && month) {
            createdAtFilter.$expr = {
                $and: [
                { $eq: [{ $year: "$createdAt" }, year] },
                { $eq: [{ $month: "$createdAt" }, month] },
                ],
            };
        }

		// Manually fetch associated printingLogs with sorting
		const printingLogs = await printingLog
			.find({
				printerId: singlePrinter.printerId,
				status: log_status,
				...createdAtFilter, //------------------->Right value is finishDate
			})
			.select(
				'_id status finishDate paperSize numVersion pagesPerSheet document printerId createdAt updatedAt'
			)
			.sort({createdAt: sortDirection}) //------------------->Right value is finishDate
			.exec()

		// Step 3: Total, Average of Printed A3 and A4
		let totalA3Pages = 0
		let totalA4Pages = 0

		printingLogs.forEach((log) => {
			const {paperSize, numVersion, pagesPerSheet, document} = log
			totalA3Pages +=
				log.paperSize === 'A3'
					? printed_pages(paperSize, numVersion, pagesPerSheet, document)
					: 0
			totalA4Pages +=
				log.paperSize === 'A4'
					? printed_pages(paperSize, numVersion, pagesPerSheet, document)
					: 0
		})

        //update general value
        sumA3 += totalA3Pages
        sumA4 += totalA4Pages
        sumPrinted += printingLogs.length

		return {
			printerId: singlePrinter.printerId,
			location: singlePrinter.location,
			queuedLogs: printingLogs.length,
			totalA3Pages,
			totalA4Pages,
		}
	})

    let all_printers = await Promise.all(filteredPrinters)

    let result = {
        total_A3 : sumA3,
        total_A4: sumA4,
        total_Printed: sumPrinted,
        total_pages : sumA3 + sumA4,
        avg_A3 : Math.floor(sumA3/filteredPrinters.length),
        avg_A4: Math.floor(sumA4/filteredPrinters.length),
        avg_Printed: Math.floor(sumPrinted/filteredPrinters.length),
        all_printers: all_printers
    }

	return result
}

export default report
