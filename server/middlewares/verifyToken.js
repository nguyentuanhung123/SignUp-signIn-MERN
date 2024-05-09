const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET,  async (err, decode) => {
            console.log("decode: ", decode);

            //const user = await await userModel.findById(decode._id)

            //console.log("user: ", user);

            if(err) {
                return res.status(400).json({
                    message: "Unauthorized access",
                    error: true,
                    success: false
                })
            }

            req.userId = decode?._id;

            next()
        })
        // console.log("token", token);
    } catch (err) {
        return res.status(500).json({
            message: err,
            error: true,
            success: false
        })
    }
}

module.exports = verifyToken;