const mongoose = require('mongoose');
const connectDB = async() =>{
    mongoose.connection.on('connected',()=>{
        console.log("Db connected")
    })
    const res = await mongoose.connect(`${process.env.MONGO_URI}/BlackCabs`)
    // console.log(res);

}
module.exports= connectDB;