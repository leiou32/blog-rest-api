const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);