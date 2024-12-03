const express = require("express");
const router = express.Router();
const {verifyUserToken} = require('../auth/token')

const { userLogin, userSignUp, userLogout} = require('../handlers/userHandlers');

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.post("/logout", userLogout);

router.post("/verify", verifyUserToken)

module.exports = router;