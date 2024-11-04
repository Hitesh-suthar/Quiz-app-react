const express = require("express");
const router = express.Router();


const { userLogin, userSignUp, userUpdate, userDelete } = require('../handlers/userHandlers');

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.patch("/update", userUpdate);

router.delete("/delete", userDelete);


module.exports = router;