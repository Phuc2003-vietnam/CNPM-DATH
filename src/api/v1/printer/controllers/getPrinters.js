import printerService from "../services/index.js"

const getPrinters =  async (req, res, next) => {
    try {
        const data = await new printerService().getPrinters({})
        res.status(200).json({data})
    } catch(err) {
        next(err)
    }
}

export default getPrinters