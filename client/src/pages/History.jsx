import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { url } from '../store/atoms/url'
import Booking from '../components/Booking/Booking';
import HistoryBooking from '../components/HistoryBooking';

const History = () => {
    const apiUrl = useRecoilValue(url);
    const [historyList, setHistoryList]= useState([])
    const getBookings = async() =>{
        const response = await fetch(`${apiUrl}api/booking/history`,{
            method: "GET",
            credentials:'include',
            headers:{'Content-type':'application/json'}         
          })
          // console.log(await response.json())
          const data= await response.json()
          if(data.length !==historyList.length)
          setHistoryList()
    };                  
    useEffect(()=>{
        
        getBookings()
      })
  return (
    <div className='m-8'>
        <h2 className='font-bold  mb-4 text-xl'>History</h2>
        {historyList.length === 0 
      ? <div ><p>There are no cabs booked.</p></div> 
      :historyList.map((booking, index) => {
        return (
         <HistoryBooking key = {index} booking= {booking}></HistoryBooking>
        );
      })}
      
    </div>
  )
}

export default History
