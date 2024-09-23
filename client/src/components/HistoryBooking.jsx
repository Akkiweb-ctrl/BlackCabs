import React from 'react';


const HistoryBooking = ({booking}) => {
  return (
    <div className="bg-slate-100 p-4 rounded-lg flex flex-col mb-4">
    <div className="flex justify-between flex-wrap">
      <p className="font-medium text-xl">{booking.date} {booking.time}</p>
    </div>
    <div>
      <p>PickUp location: {booking.source}</p>
      <p>Dropoff location: {booking.destination}</p>
      <p>Special request: {booking.specialRequest}</p>
    </div>
  </div>
  )
}

export default HistoryBooking
