import React, { useContext, useEffect, useState } from "react";
import styles from "./UpcomingBookings.module.css";
import { BookingsContext } from "../../store/BookingsContext";
import Booking from "../Booking/Booking";
import { url } from "../../store/atoms/url";
import { useRecoilValue } from "recoil";

const UpcomingBookings = () => {
  const { bookingList,setBookingList, booking } = useContext(BookingsContext);
  const apiUrl = useRecoilValue(url);
  useEffect( ()=>{
    const getBookings = async() =>{
        const response = await fetch(`${apiUrl}api/booking/get-my-booking`,{
            method: "GET",
            credentials:'include',
            headers:{'Content-type':'application/json'}         
          })
          // console.log(await response.json())
          setBookingList(await response.json())
    };
    getBookings()
  },[booking])
 
  return (
    <div className='w-2/5 h-128 md:mt-0 mt-8  overflow-y-scroll pr-2 no-scrollbar'>
      <div className="mb-8 ">
        <h3 className="font-bold text-lg">Bookings for next 7 days</h3>
      </div>
      {bookingList.length === 0 
      ? <div ><p>There are no cabs booked.</p></div> 
      :bookingList.map((booking, index) => {
        return (
         <Booking key = {index} booking= {booking}></Booking>
        );
      })}
    </div>
  );
};

export default UpcomingBookings;
