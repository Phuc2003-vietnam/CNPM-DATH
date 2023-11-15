import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user.js'
import printer from '#~/model/printer.js'
import configuration from '#~/model/configuration.js'

function balance_helper(paperSize, numVersion, pagesPerSheet, document){

    let pay_amount = 0
    let flag = (document.pages%pagesPerSheet===0) ? 0:1
    pay_amount = (Math.floor(document.pages/pagesPerSheet) + flag) * numVersion //default A4

    if(paperSize === "A3"){
        pay_amount *= 2
    }
    return pay_amount
}
async function confirm_print({
    paperSize, 
    numVersion,
    colorOption,
    landScapeOption,
    pagesPerSheet,
    document, 
    user_id, printerId
}) {


    if(numVersion <= 0){
        return Promise.reject({
            status: 400,
            message: 'numVersion has to be more than 0'
        })
    }

    const checkUser = await user.findById(user_id)
    if(!checkUser) {
        return Promise.reject({
            status: 404,
            message: "The requested user_id was not found in the database"
          })
    }
    const checkPrinter = await printer.findOne({printerId})
    if(!checkPrinter) {
        return Promise.reject({
            status: 404,
            message: "The requested printerId was not found in the database"
          })
    } else if(checkPrinter.status !== 1) {
        return Promise.reject({
            status: 503,
            message: "The printer is currently offline. Please try again later"
          })
    }

    //Check accepted file
    const getConfig = await configuration.findOne({})
    if(!getConfig){
        return Promise.reject({
            status: 404,
            message: "No configuration to check the document type in database"
        })
    }
    const typelist = getConfig.fileType
    if (!typelist.includes(document.fileType)){
        return Promise.reject({
            status: 415,
            message: `Unsupported Media Type of the document [${document.title}.${document.fileType}]`
        })
    }

    //Not enough balance
    // let pay_amount = paperSize === "A4" ? document.pages * numVersion : 2 * document.pages * numVersion
    let pay_amount = balance_helper(paperSize, numVersion, pagesPerSheet, document)
    if(checkUser.balance < pay_amount){
        return Promise.reject({
            status: 503,
            message: `Not enough blance: requested ${pay_amount} but available ${checkUser.balance}`
        })
    }

    ///Passed all
    //Create new record
    const newPrintingLog = await printingLog.create({
        status: "Queued", //InProgress, Completed, Failed
        finishDate: null, 

        paperSize, //"A4", "A3"
        numVersion,
        colorOption,
        landScapeOption,
        pagesPerSheet,
        document, 
        user_id, printerId
    })
    
    // Update the user document to associate the new printing log
    let new_balance = checkUser.balance - pay_amount
    await user.updateOne(
        { _id: checkUser._id } ,
        { 
            $push: { printingLog: newPrintingLog._id },
            $set: {balance: new_balance}
        }
    )
    
    // Update the printer document to associate the new printing log
    await printer.updateOne(
        {printerId},
        {
            $push: {printingLog: newPrintingLog._id}
        }
    )

    return newPrintingLog
}

export default confirm_print
