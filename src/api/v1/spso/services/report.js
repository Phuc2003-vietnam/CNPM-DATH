import printer from '#~/model/printer.js'
import printingLog from '#~/model/printingLog.js'

//Function to calculate numper_of_pages will be printed for each printingLog
function printed_pages(paperSize, numVersion, pagesPerSheet, document) {
	let pay_amount = 0
	let flag = document.pages % pagesPerSheet === 0 ? 0 : 1
	pay_amount = (Math.floor(document.pages / pagesPerSheet) + flag) * numVersion

	return pay_amount
}

async function getRangeYear() {
    try {
        const result = await printingLog.aggregate([
            {
                $group: {
                    _id: null,
                    base_year: { $min: { $year: "$createdAt" } },
                    end_year: { $max: { $year: "$createdAt" } },
                }
            }
        ]);

        if (result.length > 0) { return result[0] } 

        return null

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
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

    if(!year){
        return Promise.reject({
            status: 503,
            message: "year query is required!"
        })
    }

	let log_status = 'Completed' //-----------------------------------> True value is completed

	// Step 1: List of Printers with Additional Information
	const printers = await printer
		.find()
		.select('_id printerId printingLog location')
    
    //Pre count
    let sumA4 = 0
    let sumA3 = 0
    let sumPrinted = 0


    // Step 2: Printer Information by Year/Month
    const filteredPrinters = printers.map(async (singlePrinter) => {
        const printerInfo = {
            printerId: singlePrinter.printerId,
            location: singlePrinter.location,
            monthlyData: [],
        };

        // Manually fetch associated printingLogs with sorting
        const printingLogs = await printingLog
            .find({
                printerId: singlePrinter.printerId,
                status: log_status
            })
            .select('_id status finishDate paperSize numVersion pagesPerSheet document printerId createdAt updatedAt')
            .exec();

        // Iterate through all possible month-year combinations
        let base_year = new Date(), end_year = new Date()
        let base_month = 1, end_month = 12

        try {
            const range = await getRangeYear()
            if(range) {
                base_year = range.base_year
                end_year = range.end_year
            }
        } catch (err){
           return printerInfo
        }

        //If year and month is requested
        if(year) {
            if (year < base_year) { end_year = base_year - 1}
            else if(year > end_year) { base_year = end_year + 1}
        }
        if(month) {base_month = parseInt(month), end_month = base_month}

        //Get all the month-year
        for (let yyyy = base_year; yyyy <= end_year; yyyy++) {
            for (let mm = base_month; mm <= end_month; mm++) 
            {
                const logMonthYear = `${yyyy}-${mm}`;
                printerInfo.monthlyData.push({
                    monthYear: logMonthYear,
                    printerId: singlePrinter.printerId,
                    printed: 0,
                    totalA3Pages: 0,
                    totalA4Pages: 0,
                });
            }
        }

        // Update data for existing month-years
        printingLogs.forEach((log) => {
            
            if(!log.finishDate) return

            const logMonthYear = `${log.finishDate.getFullYear()}-${log.finishDate.getMonth() + 1}`;
            const monthlyEntry = printerInfo.monthlyData.find(entry => entry.monthYear === logMonthYear);

            if(!monthlyEntry) return
            
            monthlyEntry.printed += 1;
            monthlyEntry.totalA3Pages += log.paperSize === 'A3' ? printed_pages(log.paperSize, log.numVersion, log.pagesPerSheet, log.document) : 0;
            monthlyEntry.totalA4Pages += log.paperSize === 'A4' ? printed_pages(log.paperSize, log.numVersion, log.pagesPerSheet, log.document) : 0;

        });

        // Update general values
        sumA3 += printerInfo.monthlyData.reduce((total, entry) => total + entry.totalA3Pages, 0);
        sumA4 += printerInfo.monthlyData.reduce((total, entry) => total + entry.totalA4Pages, 0);
        sumPrinted += printerInfo.monthlyData.reduce((total, entry) => total + entry.printed, 0);

        return printerInfo;
    })

    let all_printers = await Promise.all(filteredPrinters)

    //Filter again
    let final_printers = []
    for(let singlePrinter of all_printers){
       
        let monthly_A3 = singlePrinter.monthlyData.reduce((total, entry) => total + entry.totalA3Pages, 0);
        let monthly_A4 = singlePrinter.monthlyData.reduce((total, entry) => total + entry.totalA4Pages, 0);
        let monthly_printed = singlePrinter.monthlyData.reduce((total, entry) => total + entry.printed, 0);

        if(singlePrinter.monthlyData.length <=0) continue

        final_printers.push({
            date: month ? `${month}-${year}` : year,
            printerId: singlePrinter.printerId,
            location: singlePrinter.location,
            printed: monthly_printed,
            totalA3Pages: monthly_A3,
            totalA4Pages: monthly_A4
        })
    }

    //sort
    final_printers.sort((a, b) => {
        const Date_a = new Date(a.date)
        const Date_b = new Date(b.date)
        return sortDirection * (Date_a - Date_b)
    })
    //pagination
    const startIndex = (current_page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginatedPrinters = final_printers.slice(startIndex, endIndex)

    let result = {
        total_A3 : sumA3,
        total_A4: sumA4,
        total_Printed: sumPrinted,
        total_pages : sumA3 + sumA4,
        avg_A3 : Math.floor(sumA3/paginatedPrinters.length),
        avg_A4: Math.floor(sumA4/paginatedPrinters.length),
        avg_Printed: Math.floor(sumPrinted/paginatedPrinters.length),
        all_printers: paginatedPrinters
    }

	return result
}

export default report
