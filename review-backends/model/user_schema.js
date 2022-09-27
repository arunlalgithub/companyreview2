const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    name: String,
    email:String,
    password: String,
    phone: String,
    city: String,
    state: String,
    resetToken : String,
    expireToken : Date,
    profilepic : String,
    isActive: {
        type: Boolean,
        default: true
    },
    role :{
        type: String,
        default: "User"
    },
   
})
userSchema.set('timestamps', true)
module.exports = mongoose.model("users", userSchema)
