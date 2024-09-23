import React, { useState } from 'react'
import BookingsCalender from './BookingsCalender/BookingsCalender'
import DateBookings from './DateBookings'

const Calender = () => {
    const [dailyBookings , setDailyBookings] = useState([]);
  return (
    <div className='flex xl:justify-around justify-center items-center xl:items-start xl:flex-row flex-col'>
        <BookingsCalender setDailyBookings ={setDailyBookings}></BookingsCalender>
        <DateBookings dailyBookings = {dailyBookings}></DateBookings>

    </div>
  )
}

export default Calender