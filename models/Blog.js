const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    content: {
        type: String,
        required: true,
        default: ""
    },
    auther: {
        type: String,
        required: true,
        default: ""
    },
    user_id:{
        type : mongoose.Types.ObjectId ,
        refs : "User" ,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);