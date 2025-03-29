const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{type:String , required:true},
    lastName : {type :String , required:true},
    email:{type:String , required:true , unique : true},
    password:{type:String , required:true},
    isVerified: { type: Boolean, default: false },
    role:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const UserModel = mongoose.model("user",userSchema)
module.exports = UserModel;