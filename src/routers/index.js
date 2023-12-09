import express from 'express'
import ver1_router from '../api/v1/index.js'
import printer from '../model/printer.js'
import configuration from '../model/configuration.js'
const router = express.Router()

// router.use("/test",async(req,res)=>{
// //    var result =await printer.updateOne({_id:"654ca55507cd4cc10f339c9d"},{$set: {model:"olm"}})
// //   console.log(result);
// const specificStartDate1 = new Date('2023-11-10'); // Example specific date
// const specificStartDate2 = new Date('2023-11-15');
// const newConfiguration = {
//     startDate1: specificStartDate1,
//     startDate2: specificStartDate2,
//     defaultBalance: 1000,
//     currentBalance: 500,
//     fileType: ['pdf', 'docx'],
//   };
//     var result = await configuration.create(newConfiguration)
//     console.log(result);
//     res.send("ok")
// })

router.use('/v1', ver1_router)

export default router
