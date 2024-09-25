import React, { useContext } from 'react';
// import styles from './Booking.module.css'
import { BookingsContext } from '../../store/BookingsContext';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reschedule } from '../../store/atoms/reschedule';
import { ToReschedule } from '../../store/atoms/toReschedule';
import { url } from '../../store/atoms/url';
import  {formatISO9075,format} from 'date-fns';


const Booking = ({booking}) => {
    // const {cancelBooking} = useContext(BookingsContext);
  const { setBooking } = useContext(BookingsContext);

    const setShowReschedule = useSetRecoilState(reschedule);
    const setToReschedule = useSetRecoilState(ToReschedule);
  const apiUrl = useRecoilValue(url)


    const handleReschedule = (booking) =>{
      // console.log(booking)
        setToReschedule(booking);
        setShowReschedule(true);

    }
    const handleCancel = async(deleteItem) =>{
      const res= await fetch(`${apiUrl}api/booking/delete-booking`,{
        method:'DELETE',
        credentials:'include',
        body:JSON.stringify({
          id:deleteItem._id
        }),
        headers:{'Content-type':'application/json'}
      })
      if(res.ok){
        // setShowReschedule(false);
        // console.log(await res.json())
        setBooking({});
        alert("Booking cancelled!!!");
        // setBookingList(await res.json());
        // navigate('/home')
      }
    }
  return (
    <div className="flex justify-between mb-4 p-4 bg-slate-100 rounded-lg">
      <div>
        <div className="flex flex-wrap justify-between">
      <p className="font-medium text-xl mb-4">{formatISO9075(new Date(booking.date), { representation: 'date' })} {booking.time}</p>
      
    </div>
    <div>
      <p>PickUp location: {booking.source}</p>
      <p>Dropoff location: {booking.destination}</p>
      <p>Special request: {booking.specialRequest}</p>
    </div>
      </div>
      <div className=" flex flex-col gap-8 ">
        <button className=' bg-white  w-32 text-black rounded h-8 border border-solid border-slate-300 px-4 hover:bg-red-600' onClick={()=>handleReschedule(booking)}>Reschedule</button>
        <button className=' bg-white w-32  text-black rounded h-8 border border-solid border-slate-300 px-4 hover:bg-slate-100' onClick={()=>handleCancel(booking)}>Cancel</button>
      </div>
    
  </div> 
  )
}

export default Booking
