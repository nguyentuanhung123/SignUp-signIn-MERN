const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

const userSignUp = async (req, res) => {
    try {
        if(!req.body.email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if(!req.body.password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            })
        }

        if(!req.body.name) {
            return res.status(400).json({
                message: "Please provide name",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email: req.body.email})

        if(user) {
            return res.status(200).json({
                message: "Already user exits",
                error: true,
                success: false
            })
        }

        // convert password into hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                // Store hash in your password db.
                if(err) {
                    return res.status(400).json({
                        message: err,
                        error: true,
                        success: false
                    })
                }

                // console.log("hash", hash);

                const payload = {
                    ...req.body,
                    password: hash
                }

                const userDetails = new userModel(payload)
                const save = await userDetails.save()

                return res.status(200).json({
                    message: "User Created Successfully",
                    data: save,
                    error: false,
                    success: true
                })
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

module.exports = userSignUp;