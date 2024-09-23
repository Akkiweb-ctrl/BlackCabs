const express= require('express');
const {addBooking,rescheduleBooking,getMyBookings,getHistory,deleteBooking,getMonthlyBookings,getDailyBookings} = require('../controllers/bookingController')


const bookingRouter = express.Router();

bookingRouter.post('/add-booking',addBooking)
bookingRouter.put('/reschedule-booking',rescheduleBooking)
bookingRouter.get('/get-my-booking',getMyBookings)
bookingRouter.get('/history',getHistory)
bookingRouter.delete('/delete-booking',deleteBooking)
bookingRouter.get('/get-monthly-bookings/:currDate',getMonthlyBookings)
bookingRouter.get('/get-daily-bookings/:day',getDailyBookings)

module.exports= bookingRouter
