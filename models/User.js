const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    username:{
        type:String,
        required:[true, "username is required" ],
        unique: [true, "username already taken please pick another username"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    }
})

const User = model("User",userSchema)

module.exports = User