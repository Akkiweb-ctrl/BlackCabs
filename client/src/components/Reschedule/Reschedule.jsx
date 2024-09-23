import React, { useContext, useRef, useState } from 'react'
import styles from './Reschedule.module.css'
import { BookingsContext } from '../../store/BookingsContext';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reschedule } from '../../store/atoms/reschedule';
import { ToReschedule } from '../../store/atoms/toReschedule';
import { url } from '../../store/atoms/url';
import { useNavigate } from 'react-router-dom';
import { bookingsList } from '../../store/atoms/bookingsList';

const Reschedule = () => {
  // const setBookingList  = useSetRecoilState(bookingsList);
  const { setBooking } = useContext(BookingsContext);
  const setShowReschedule = useSetRecoilState(reschedule);
  const toReschedule = useRecoilValue(ToReschedule)
  const apiUrl = useRecoilValue(url)

  const [source, setSource] = useState(toReschedule.source);
  const [destination, setDestination] = useState(toReschedule.destination);
  const [time, setTime] = useState(toReschedule.time);
  const [date, setDate] = useState(toReschedule.date);
  const [specialRequest, setSpecialRequest] = useState(toReschedule.specialRequest);

  const navigate = useNavigate();
  // console.log(toReschedule)
 
  const handleReschedule = async(ev) =>{
    ev.preventDefault();
    const id = toReschedule._id;
    const res= await fetch(`${apiUrl}api/booking/reschedule-booking`,{
      method:'PUT',
      credentials:'include',
      body:JSON.stringify({
        id,
        source,
        destination,
        date,
        time,
        specialRequest
      }),
      headers:{'Content-type':'application/json'}
    })
    if(res.ok){
      setShowReschedule(false);
      // console.log(await res.json())
      setBooking(await res.json());
      // setBookingList(await res.json());
      // navigate('/home')
    }
}

  return (
    <div className={styles["reschedule"]}> 
      <div className={styles["form-container"]}>
      <div>
        <h3 className={styles["title"]}>Reschedule</h3>
      </div>
      <form className={styles["booking-form"]} onSubmit={handleReschedule}>
        <div className={styles["address"]}>
          <div className={styles["input"]}>
            <label htmlFor="pickup-location">Pickup location</label>
            <input type="text" id="pickup-location" name="pickup" defaultValue={toReschedule.source} onChange={(ev)=>setSource(ev.target.value)}/>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="dropoff-location">Dropoff location</label>
            <input type="text" id="dropoff-location" name="dropoff" defaultValue={toReschedule.destination} onChange={(ev)=>setDestination(ev.target.value)}/>
          </div>
        </div>

        <div className={styles["date-time"]}>
          <div className={styles["input"]}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={toReschedule.date} onChange={(ev)=>setDate(ev.target.value)}/>
          </div>
          <div className={styles["input"]}>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" defaultValue={toReschedule.time} onChange={(ev)=>setTime(ev.target.value)}/>
          </div>
        </div>
        <div className={styles["req"]}>
          <div className={styles["input"]}>
            <label htmlFor="special-req">Special Request</label>
            <input type="text" id="special-req" name="req" defaultValue={toReschedule.specialRequest} onChange={(ev)=>setSpecialRequest(ev.target.value)}/>
          </div>
        </div>

        <div className={styles["btn-container"]}>
          <button typpe='submit' className={styles["book-cab-btn"]}>
           Reschedule
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Reschedule
