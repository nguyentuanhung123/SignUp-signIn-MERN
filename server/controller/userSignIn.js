const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSignIn = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if(!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "User not available",
                error: true,
                success: false
            })
        }

        // console.log("user", user);

        // load hash from your paswword DB.
        bcrypt.compare(password, user.password, (err, resBcrypt) => {
            // res === true
            if(err) {
                return res.status(400).json({
                    message: "Check your password",
                    error: true,
                    success: false
                })
            }
          
            const payload = {
                _id: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            // console.log("token", token);
            return res.status(200).json({
                token: token,
                message: "Login successfully",
                error: false,
                success: true
            })

        })


    } catch (err) {
        return res.status(500).json({
            message: err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignIn;