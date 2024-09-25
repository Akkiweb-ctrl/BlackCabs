import React, { useContext, useRef, useState } from 'react'
import styles from './Reschedule.module.css'
import { BookingsContext } from '../../store/BookingsContext';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reschedule } from '../../store/atoms/reschedule';
import { ToReschedule } from '../../store/atoms/toReschedule';
import { url } from '../../store/atoms/url';
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";


// import { useNavigate } from 'react-router-dom';
// import { bookingsList } from '../../store/atoms/bookingsList';

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
  const [errors, setErrors] = useState();

  // const navigate = useNavigate();
  // console.log(toReschedule)
 
  const validationSchema = Yup.object({
    source: Yup.string()
      .min(2, "Pick up must be atleast 2 characters long")
      .required("Pick up is required"),
    destination: Yup.string()
      .min(2, "Drop off must be atleast 2 characters long")
      .required("Drop off is required"),
    date: Yup.string().required("Date is required"),
    // numberOfPeople: Yup.number()
    //   .required("Field is required")
    //   .positive("Number must be greater than 0")
    //   .integer("Number must be an integer"),
    time: Yup.string().required("Time is required"),
    // cab: Yup.string().required("Cab is required"),
  });

  const handleReschedule = async(ev) =>{
    ev.preventDefault();
    try {
      await validationSchema.validate(
        { source, destination, date, time },
        { abortEarly: false }
      );
      rescheduleBooking();
      setErrors({});
      // login()
    } catch (error) {
      console.log(error)
      let newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
        console.log(errors);
        setErrors(newErrors);
      });
    }
    
}

const rescheduleBooking = async() =>{
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
      <div className='flex justify-between'>
        <h3 className="font-bold mb-4">Reschedule</h3>
        <span className='text-lg font-bold cursor-pointer' onClick={() => {
              setShowReschedule(false);
            }}>            <RxCross1 />
        </span>
      </div>
      <form className={styles["booking-form"]} onSubmit={handleReschedule}>
        <div className={styles["address"]}>
          <div className={styles["input"]}>
            <label htmlFor="pickup-location">Pickup location</label>
            <input type="text" id="pickup-location" name="pickup" defaultValue={toReschedule.source} onChange={(ev)=>setSource(ev.target.value)}/>
            {errors && errors.source && (
              <p className="text-red-600">{errors.source}</p>
            )}
          </div>
          <div className={styles["input"]}>
            <label htmlFor="dropoff-location">Dropoff location</label>
            <input type="text" id="dropoff-location" name="dropoff" defaultValue={toReschedule.destination} onChange={(ev)=>setDestination(ev.target.value)}/>
            {errors && errors.destination && (
              <p className="text-red-600">{errors.destination}</p>
            )}
          </div>
        </div>

        <div className={styles["date-time"]}>
          <div className={styles["input"]}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={toReschedule.date} onChange={(ev)=>setDate(ev.target.value)}/>
            {errors && errors.date && (
              <p className="text-red-600">{errors.date}</p>
            )}
          </div>
          <div className={styles["input"]}>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" defaultValue={toReschedule.time} onChange={(ev)=>setTime(ev.target.value)}/>
            {errors && errors.time && (
              <p className="text-red-600">{errors.time}</p>
            )}
          </div>
        </div>
        <div className={styles["req"]}>
          <div className={styles["input"]}>
            <label htmlFor="special-req">Special Request</label>
            <input type="text" id="special-req" name="req" defaultValue={toReschedule.specialRequest} onChange={(ev)=>setSpecialRequest(ev.target.value)}/>
            {errors && errors.specialRequest && (
              <p className="text-red-600">{errors.specialRequest}</p>
            )}
          </div>
        </div>

        <div className={styles["btn-container"]}>
          <button type='submit' className={styles["book-cab-btn"]}>
           Reschedule
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Reschedule
