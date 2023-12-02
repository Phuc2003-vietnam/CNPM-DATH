import NotitcationService from "../../notification/index.js"

const getNotifications = async (req, res, next) => {
    try {
        const data = await new NotitcationService().getNotifications({
            user_id: req.spsoService.userInfo._id.toString()
        })
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default getNotifications