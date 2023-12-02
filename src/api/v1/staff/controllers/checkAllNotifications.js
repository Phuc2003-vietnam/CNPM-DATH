import NotitcationService from "../../notification/index.js"

const checkAllNotifications = async (req, res, next) => {
    try {
        const data = await new NotitcationService().checkAllNotifications({
            user_id: req.staffService.userInfo._id.toString()
        })
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default checkAllNotifications