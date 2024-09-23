import React from 'react'
import Header from '../components/Header/Header'
import CarSlider from '../components/Slider/CarSlider'
import WhyBlackCabs from '../components/WhyBlackCabs.jsx/WhyBlackCabs'
import LoginPopup from '../components/LoginPopup/LoginPopup'
import FAQs from './FAQs'

const LandingPage = () => {
  return (
    <>
    {/* <CarSlider></CarSlider> */}
    <WhyBlackCabs/>
    <FAQs id ="FAQ"></FAQs>
    {/* <LoginPopup></LoginPopup> */}
    </>
    
  )
}

export default LandingPage
