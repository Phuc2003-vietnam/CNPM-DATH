import printingLog from '#~/model/printingLog.js'
import user from '#~/model/user'
import printer from '#~/model/printer'
import configuration from '#~/model/configuration'

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

    const checkUser = await user.findOne({user_id})
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
            message: `Unsupported Media Type of the document ${document.title}${document.fileType}`
        })
    }

    //Not enough balance
    // if()

    ///Passed all
    //Create new record
    const newPrintingLog = await printingLog.create({
        status: "Queued", //InProgress, Completed, Failed
        finishDate: null, 

        paperSize, 
        numVersion,
        colorOption,
        landScapeOption,
        pagesPerSheet,
        document, 
        user_id, printerId
    })

    // Update the user document to associate the new printing log
    await user.updateOne(
        { user_id },
        { $push: { printingLog: newPrintingLog._id } }
    )
    
    // Update the printer document to associate the new printing log
    await printer.updateOne(
        {printerId},
        {$push: {printingLog: newPrintingLog._id}}
    )

    return newPrintingLog


}

// export default confirm_print
module.exports = {
    confirm_print,
}