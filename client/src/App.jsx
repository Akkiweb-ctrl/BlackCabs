import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Reschedule from "./components/Reschedule/Reschedule";
import { BookingsContext } from "./store/BookingsContext";
import { useRecoilValue } from "recoil";
import { reschedule } from './store/atoms/reschedule';
import { Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer";

function App() {
    const showReschedule = useRecoilValue(reschedule);
    const [showLogin, setShowLogin ] = useState(false);
    const [loginState, setLoginState] = useState(true);
    useEffect(() => {
      if (showLogin) {
        // Disable scroll when modal opens
        document.body.style.overflow = 'hidden';
      } else {
        // Enable scroll when modal closes
        document.body.style.overflow = 'auto';
      }
  
      // Clean up: revert overflow on unmount
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [showLogin]);

  return (
    <>
      {showReschedule === true ? (
        <div className="reschedule-container">
          <Reschedule></Reschedule>
        </div>
      ) :<></>}
      {showLogin === true ? (
          <LoginPopup setShowLogin={setShowLogin} setLoginState= {setLoginState} loginState= {loginState}></LoginPopup>

      ) :<></>}
       <div className={`app-container `}>
          <div className={`main-section `}>
            <Header className="header" setShowLogin={setShowLogin} setLoginState= {setLoginState} ></Header> 
            <Outlet></Outlet>
            <Footer></Footer>
          </div>{" "}
        </div>
    </>
  );
}

export default App;
