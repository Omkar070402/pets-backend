import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
   
    name : {
        type : String,
        required : true,        
    },
    breed : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        enum : ['Male','Female']
    },
    description : {
        type : String,
        required : true

    }, images: [{
        type: String,  
        required: true}],
    
    location: {
        type: String,
        required: true,
    },
    adoptionStatus: {
        type: String,
        enum: ["Available", "Adopted", "Pending"],
        default: "Available",
    },


},{timestamps : true})

const Pet = mongoose.model('Pet',petSchema)

export default Pet

