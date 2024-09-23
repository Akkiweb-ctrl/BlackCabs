import React from 'react'
import  {formatISO9075,format} from 'date-fns';


const DailyBooking = ({booking}) => {
  return (
<div className=" w-90 min-w-80 flex flex-col mb-4 mr-4 p-4 bg-slate-100 rounded-lg border-2 border-black">
    <div className="flex flex-wrap justify-between">
      <p className="font-medium text-xl">{formatISO9075(new Date(booking.date), { representation: 'date' })} {booking.time}</p>
      
    </div>
    <div>
      <p>PickUp location: {booking.source}</p>
      <p>Dropoff location: {booking.destination}</p>
      <p>Special request: {booking.specialRequest}</p>
    </div>
  </div>  )
}

export default DailyBooking