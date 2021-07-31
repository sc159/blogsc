const mongoose = require("mongoose")
let Schema = mongoose.Schema
let userSchema = new Schema({
    id:{
        type:String
    },
    //用户名
    user: {
        type: String,
        required: true
    },

    //密码
    pass: {
        type: String,
        required: true
    },

    //头像
    photo: {
        type: String,
        default: "/file/photo/default.jpg"
    }
})

module.exports = mongoose.model("user", userSchema)
