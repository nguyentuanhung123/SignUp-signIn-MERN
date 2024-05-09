const express = require('express');
const router = express.Router();

const userSignUp = require('../controller/userSignUp');
const userSignIn = require('../controller/userSignIn');

router.post("/sign-up", userSignUp)
router.post("/sign-in", userSignIn)

module.exports = router;

