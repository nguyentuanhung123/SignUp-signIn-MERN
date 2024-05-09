const userModel = require("../models/userModel")

const userProfile = async (req, res) => {
    try {
        // console.log("userId: ", req.userId);

        const user = await userModel.findById(req.userId).select("-password")

        return res.status(200).json({
            message: "User details",
            data: user,
            error: false,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
            error: true,
            success: false
        })
    }
}

module.exports = userProfile;