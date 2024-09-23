import React, { useState } from 'react'
import UpcomingBookings from '../components/UpcomingBookings/UpcomingBookings'
import BookingsCalender from '../components/BookingsCalender/BookingsCalender'
import NewBooking from '../components/NewBooking/NewBooking'
import LandingPage from './LandingPage'
import { useRecoilValue } from 'recoil'
import { loggedIn } from '../store/atoms/login'

const Home = () => {
  const hasLoggedIn = useRecoilValue(loggedIn);

  
  return (
    <>
    {hasLoggedIn && <div className='flex  flex-wrap justify-evenly mb-8'>
      <NewBooking  ></NewBooking>
      <UpcomingBookings ></UpcomingBookings>
    </div>}
    <LandingPage></LandingPage>
    </>
  )
}

export default Home
