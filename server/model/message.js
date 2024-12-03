const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
        },
        message: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
)

const messageModel = new mongoose.model("message", messageSchema);

module.exports = messageModel;