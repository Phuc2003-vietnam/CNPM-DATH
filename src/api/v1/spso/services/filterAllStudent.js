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
    if (studentName) {
        query.$or = [
          { 'firstName': { $regex: new RegExp(studentName, 'i') } },
          { 'lastName': { $regex: new RegExp(studentName, 'i') } }
        ]
    } //applied case-insensitive match and escape

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

    // Batch lookup for printing logs
    const logIds = allStudents.reduce((ids, student) => ids.concat(student.printingLog), [])
    const logs = await printingLog.find(
        { 
            _id: { $in: logIds },
            status: "Completed"
        }
    )

    // Map logs to students
    allStudents.forEach((student) => {

        student.printingLog = logs.filter((log) => student.printingLog.includes(log._id.toString()))

        student.total_payment = student.printingLog.reduce(
            (total, log) => total + balance_helper(log.paperSize, log.numVersion, log.pagesPerSheet, log.document), 0
        )
    })

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