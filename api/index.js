const express = require("express");
const cors = require("cors");
const connectDB =  require("./config/dbConfig")
const userRouter = require('./routes/userRoutes');
const bookingRouter = require("./routes/bookingRoutes");
const cookieParser = require('cookie-parser')

require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000
const corsOptions = {
    origin: ['https://black-cabs-frontend.vercel.app/'], //included origin as true
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, //included credentials as true
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
};
connectDB()

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/user',userRouter)
app.use('/api/booking',bookingRouter)
app.get("/",(req,res )=>{
    res.send("Working")
})

app.listen(port,()=>{
    console.log("app is listening to port "+port)
})