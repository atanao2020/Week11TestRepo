const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
})

const Doctors = mongoose.model("Doctors", doctorSchema)
module.exports = Doctors