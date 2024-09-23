const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    source:{type:String, required:true},
    destination:{type:String, required:true},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    cab:{type:String, required:true},
    numberOfPeople:{type:Number, required:true},
    specialRequest:{type:String, required:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user", required:true},
})

const bookingModel= mongoose.model("booking",bookingSchema);
module.exports = bookingModel
