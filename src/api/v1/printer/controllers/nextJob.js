import printerService from "../services/index.js"

const nextJob = async (req, res, next) => {
    try {
        
        const {printerId} = req.body
        const data = await new printerService().nextJob({
            printerId
        })
        res.status(200).json({data})
    } catch(err) {
        next(err)
    }
}

export default nextJob