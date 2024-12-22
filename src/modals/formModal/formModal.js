const mongoose = require("mongoose")

const formRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        // match: [/.+@.+\..+/, "Please enter a valid email address"],
    }
    ,
    contact: {
        type: Number,
        // required: true,
        // match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        // required: true,
    },
    profilePicture: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: false,
        trim: true,
    },
    dob: {
        type: Date,
        // required: true,
        
    },
    qualification:{
        type:[String],
        default:[]
    }
})

const registerModal=mongoose.model("registers",formRegisterSchema)

module.exports={registerModal}