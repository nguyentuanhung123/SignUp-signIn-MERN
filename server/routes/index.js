const express = require('express');
const router = express.Router();

const userSignUp = require('../controller/userSignUp');
const userSignIn = require('../controller/userSignIn');
const userProfile = require('../controller/userProfile');
const verifyToken = require('../middlewares/verifyToken');

router.post("/sign-up", userSignUp)
router.post("/sign-in", userSignIn)
router.post("/user-details", verifyToken, userProfile)

module.exports = router;

