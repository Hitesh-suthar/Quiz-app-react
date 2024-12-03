const express = require("express");
const router = express.Router();
const Message = require('../model/message');
const { getQuestions } = require('../quiz/function');

router.post("/quiz", async (req, res) => {
    try {
        let data = await getQuestions(req.body)
        res.send({ status: true, questions: data })
    }
    catch {
        (err) =>
            res.send({ status: false, message: err })
    }
})

router.post("/contact", async (req, res) => {
    try {
        const {name,email,message} = req.body;
        const newMessage = await Message.create({
            name,
            email,
            message
        })
        newMessage.save();
        res.send({ status: true, message:"Thank you for reaching us." })
    }
    catch {
        (err) =>
            res.send({ status: false, message: err })
    }
})

module.exports = router