import user from "#~/model/user.js"
import printingLog from "#~/model/printingLog.js"
import { balance_helper } from "../../student/services/printingLog/confirm_print.js"

async function filterAllStudent ({
    studentId, 
    studentName, 
    sortName, 
    sortPayment,
    per_page, 
    current_page
}) {

    //set default sortName, sortPayment
    if(sortName != 1 && sortName != -1){ sortName = 1}

    let query = {role: "student"}
    if (studentId) {query.mssv = {$regex: studentId}}
    if(studentName) {query.firstName = {$regex: studentName}}

    //Execute
    let allStudents = await user.aggregate([
        { $match: query },
        { $skip: (current_page - 1) * per_page },
        { $limit: per_page },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                mssv: 1,
                role:1,
                location: 1,
                createdAt: 1,
                updatedAt: 1,
                classes: 1,
                major: 1,
                printingLog: 1

            }
        }
    ])

    for(let ele of allStudents) {
        let total_payment = 0

        for(let i=0; i < ele.printingLog.length; i++){
            let log = await printingLog.findById(ele.printingLog[i])
            const {paperSize, numVersion, pagesPerSheet, document} = log
            total_payment += balance_helper(paperSize, numVersion, pagesPerSheet, document)

            ele.printingLog[i] = log
        }
        ele.total_payment = total_payment
    }

    //sort
    // Sort by name
    allStudents.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

        return sortName * nameA.localeCompare(nameB);
    });

    // Sort by total payment
    if (sortPayment === 1 || sortPayment === -1) {
        allStudents.sort((a, b) => sortPayment * (a.total_payment - b.total_payment));
    }

    return allStudents
}

export default filterAllStudent