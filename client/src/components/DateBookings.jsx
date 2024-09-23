import React from 'react'
import DailyBooking from './DailyBooking';

const DateBookings = ({dailyBookings}) => {
  return (
    <div className='w-1/3 h-128 min-w-80 flex flex-col gap-2 overflow-y-scroll'>
        {dailyBookings.length === 0 
      ? <div className='my-auto' ><p className='text-2xl'>There are no cab bookings for this day.</p></div> 
      :dailyBookings.map((booking, index) => {
        return (
         <DailyBooking key = {index} booking= {booking}></DailyBooking>
        );
      })}
    </div>
  )
}

export default DateBookings
