import React, { useState } from 'react'
import BookingsCalender from './BookingsCalender/BookingsCalender'
import DateBookings from './DateBookings'

const Calender = () => {
    const [dailyBookings , setDailyBookings] = useState([]);
  const [fetching, setFetching]= useState(false);

  return (
    <div className='flex xl:justify-around justify-center items-center xl:items-start xl:flex-row flex-col'>
        <BookingsCalender setDailyBookings ={setDailyBookings} setFetching={setFetching} fetching={fetching}></BookingsCalender>
        <DateBookings dailyBookings = {dailyBookings} fetching={fetching}></DateBookings>

    </div>
  )
}

export default Calender