const bookingModel = require('../models/bookingModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
 const {formatISO9075,format} = require('date-fns');
require("dotenv").config();

const secret= process.env.SECRET



const addBooking = async(req,res)=>{
    const {source, destination,date,time,cab,numberOfPeople,specialRequest}= req.body;
    // console.log(time)
    const {token} = req.cookies;
    try{
        jwt.verify(token,secret,async (err,info)=>{
            // console.log(info)
            const user = await userModel.findOne({email:info.email})
            // console.log(user._id)
            const booking = await bookingModel.create({
                source,
                destination,
                date: formatISO9075(date),
                time,
                cab,
                numberOfPeople,
                specialRequest,
                userId: user._id
            })
            res.json(booking)
        })

    }catch(err){
        if(err) throw err
        res.status(400).json(err);
    }
    // res.json("booking added")

}

const rescheduleBooking = async(req,res)=>{
    const {id,source, destination,date,time,specialRequest}= req.body;
    // console.log(id)
    const {token} = req.cookies;
    // res.json("ok");
    try{
        jwt.verify(token,secret,async (err,info)=>{
            // console.log(info)
            const booking = await bookingModel.findOneAndUpdate({_id:id},{
                source,
                destination,
                date,
                time,
                specialRequest,
            })
            // const bookings = await bookingModel.find({userId:info.id})
        // console.log(bookings)
        res.json(booking)
        })

    }catch(err){
        if(err) throw err
        res.status(400).json(err);
    }
}

const getMyBookings = async(req,res)=>{
    const {token} = req.cookies;
    let lastDate = new Date()
    lastDate= lastDate.setDate(lastDate.getDate()+7)
    lastDate= formatISO9075(lastDate, { representation: 'date' })
    try{
        jwt.verify(token, secret,async(err,info)=>{
        const bookings = await bookingModel.find({userId:info.id,date:{$lt:lastDate,$gt:new Date()}}).sort({date:1,time:1})
        // console.log(bookings)
        res.json(bookings)
        })
    }catch(err){
        if(err) throw err
        res.status(400).json(err);

    }
}



const getHistory = async(req,res)=>{
    const {token} = req.cookies;
    let date = new Date()
    let time = format(date,'HH:mm')

    // lastDate= lastDate.setDate(lastDate.getDate()+7)
    date= formatISO9075(date, { representation: 'date' })
    try{
        jwt.verify(token, secret,async(err,info)=>{
            console.log(info);
        const bookings = await bookingModel.find({userId:info.id,date:{$lt:new Date()}}).sort({date:1,time:1})
        console.log(bookings)
        res.json(bookings)
        })
    }catch(err){
        if(err) throw err
        res.status(400).json(err);

    }
}


const getMonthlyBookings = async(req,res)=>{
    const {token} = req.cookies;

    let {currDate} = req.params;
    currDate = new Date(currDate)
    console.log(currDate)
    
     let startDate= new Date(currDate.getFullYear(), currDate.getMonth(),1)
     let endDate= new Date(currDate.getFullYear(), currDate.getMonth()+1,1)
    // console.log(startDate)
    // console.log(endDate)
    // let date = new Date()
    // let time = format(date,'HH:mm')

    // lastDate= lastDate.setDate(lastDate.getDate()+7)
    // date= formatISO9075(date, { representation: 'date' })
    try{
        jwt.verify(token, secret,async(err,info)=>{
        const bookings = await bookingModel.find({userId:info.id,date:{$gt:startDate,$lte:endDate}},{date:1,_id:0})
        const datesArray = bookings.map((doc)=>new Date(doc.date).getDate());
        // console.log(datesArray)
        res.json(datesArray)
        })
    }catch(err){
        if(err) throw err
        res.status(400).json(err);

    }

// res.json("ok")
}

const getDailyBookings = async(req,res)=>{
    const {token} = req.cookies;

    let {day} = req.params;
    day= new Date(day);
    // day =formatISO9075(day)
    const year = day.getFullYear()
    const month = day.getMonth()
    const date = day.getDate()

// console.log(year)
// console.log(month)
// console.log(date)
    // const startDate = new Date(year, month - 1, day, 0, 0, 0); // Start of the day
    // const endDate = new Date(year, month - 1, day, 23, 59, 59); // End of the day

// console.log(startDate)

// console.log(endDate)

    let startDate = new Date(Date.UTC(day.getFullYear(), day.getMonth(),day.getDate(),0,0,0))
    let endDate = new Date(Date.UTC(day.getFullYear(), day.getMonth(),day.getDate(),23, 59, 59))
    // currDate.setTime("00:00:00")
    // console.log(currDate)
    // console.log(endDate)
    
    //  let startDate= new Date(currDate.getFullYear(), currDate.getMonth(),1)
    //  let endDate= new Date(currDate.getFullYear(), currDate.getMonth()+1,1)
    // console.log(startDate)
    // console.log(endDate)
    // let date = new Date()
    // let time = format(date,'HH:mm')

    // lastDate= lastDate.setDate(lastDate.getDate()+7)
    // date= formatISO9075(date, { representation: 'date' })
    try{
        jwt.verify(token, secret,async(err,info)=>{
        const bookings = await bookingModel.find({userId:info.id,date:{$gte:startDate,$lte:endDate}})
        // const datesArray = bookings.map((doc)=>new Date(doc.date).getDate());
        console.log(bookings)
        res.json(bookings)
        })
    }catch(err){
        if(err) throw err
        res.status(400).json(err);

    }

// res.json("ok")
}

const deleteBooking = async (req,res)=>{
    const  {id} =  req.body;
    const {token} = req.cookies;
    // console.log(id);
    // res.json("ok");
    try{
        jwt.verify(token, secret,async(err,info)=>{
        const bookings = await bookingModel.deleteOne({_id:id})
        // console.log(bookings)
        res.json(bookings)
        })
    }catch(err){
        if(err) throw err
        res.status(400).json(err);
    }
}
module.exports= {addBooking,rescheduleBooking,getMyBookings,getHistory,deleteBooking,getMonthlyBookings,getDailyBookings}