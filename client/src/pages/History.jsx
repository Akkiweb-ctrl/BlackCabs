import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { url } from '../store/atoms/url'
import HistoryBooking from '../components/HistoryBooking';
import ClipLoader from "react-spinners/ClipLoader";


const History = () => {
    const apiUrl = useRecoilValue(url);
    const [historyList, setHistoryList]= useState([])
    const [fetching, setFetching]= useState(true)
    const getBookings = async() =>{
        const response = await fetch(`${apiUrl}api/booking/history`,{
            method: "GET",
            credentials:'include',
            headers:{'Content-type':'application/json'}         
          })
          const data= await response.json()
          console.log(data)
          if(data.length !==historyList.length){
          setHistoryList(data)
            setFetching(false)
          }
    };                  
    useEffect(()=>{    
        getBookings()
      })
  return (
    <div className='m-8'>
        <h2 className='font-bold  mb-4 text-xl'>History</h2>
        {fetching?<div className='flex justify-center'><ClipLoader size={32}/></div>:historyList.length === 0 
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
