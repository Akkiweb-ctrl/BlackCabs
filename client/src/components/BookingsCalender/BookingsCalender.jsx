import React, { useEffect, useState } from "react";
import "./BookingsCalender.css";
import { useRecoilValue } from "recoil";
import { url } from "../../store/atoms/url";
// import UpcomingBookings from "../UpcomingBookings/UpcomingBookings";
// import { getDay } from "date-fns";

const BookingsCalender = ({setDailyBookings}) => {
  const [currDate, setCurrDate]= useState(new Date());
  const [daysInMonth, setDaysInMonth]= useState([]);
  const [startDay, setStartDay]= useState(0);
  const [selectedDate, setSelectedDate]= useState(null);
  const [currMonthBookings, setCurrMonthBookings]= useState([]);

  const apiUrl = useRecoilValue(url)

  const getData= async()=>{
    // console.log(currDate);
    const res = await fetch(`${apiUrl}api/booking/get-monthly-bookings/${currDate}`,{
      credentials:'include',
      headers:{'Content-type':'application/json'}
    })
    const data = await res.json();
    setCurrMonthBookings(data);
  }

  useEffect( ()=>{
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    const date = new Date(year,month,1)
    const days =[];
    while(date.getMonth()===month){
      days.push(new Date(date));
      date.setDate(date.getDate()+1);
    }
    setDaysInMonth(days);
    setStartDay(new Date(year,month,1).getDay());
    getData();
   
  },[currDate]);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];

  const prevMonth = ()=>{
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth()-1)));
  }

  const nextMonth = ()=>{
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth()+1)));
  }
  const handleDateClick = async(day) =>{
    const date= new Date(day);
    // console.log(date)
    // console.log(date.getMonth())
    // console.log(date.getFullYear())
    const res = await fetch(`${apiUrl}api/booking/get-daily-bookings/${day}`,{
      credentials:'include',
      headers:{'Content-type':'application/json'}
    })
    const data = await res.json();
    setDailyBookings(data);
    setSelectedDate(day)
  }
  return(
    <div className="min-w-72 max-w-96 my-5 mx-4 border-2 border-solid rounded-xl overflow-hidden pb-5 shadow-lg font-sans">
      <div className="flex justify-between items-center text-black p-3 text-xl font-bold">
        <button onClick={prevMonth} className="text-black text-xl opacity-70 cursor-pointer">&lt;</button>
        <span>
          {currDate.toLocaleString('default',{month:'long'})}{" "}
          {currDate.getFullYear()}
          </span>
          <button onClick={nextMonth} className="text-black text-xl opacity-70 cursor-pointer">&gt;</button>
      </div>
      <div className="flex flex-wrap mx-2">
        {dayNames.map((day)=>(
          <div key={day} className="bg-black text-white font-bold mb-2 w-[calc(100%/7)] p-2.5 border border-solid border-white box-border text-center text-xs sm:text-md opacity-80 rounded"> {day}</div>
        ))}
      </div>
      <div className="flex flex-wrap gap mx-2">
        {Array.from({length:startDay}).map((_,index)=>(
          <div key={index} className="w-[calc(100%/7)] p-2.5  box-border text-center text-md opacity-70 rounded mb-2"></div>
        ))}
        {daysInMonth.map((day)=>(
          <div key = {day} className={ ` ${currMonthBookings.includes(day.getDate()) && day.getDate()>new Date().getDate()?"border-b-orange-600":""} ${currMonthBookings.includes(day.getDate()) && day.getDate()<new Date().getDate()?"border-b-green-600":""} w-[calc(100%/7)] mb-2 p-2.5 border-2 border-solid  border-box text-center text-md opacity-70 rounded cursor-pointer day hover:bg-slate-300 ${day.getDate()=== new Date().getDate() && day.getMonth()=== new Date().getMonth() ? 'font-bold border-box text-black opacity-100 border-black border-2 text-center':''} ${selectedDate && day.toDateString()=== selectedDate.toDateString() ? 'font-bold bg-black opacity-100 text-white border text-center':''}`}
          onClick={()=>handleDateClick(day)}>
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  )
  // const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const [currentDay, setCurrentDay] = useState(new Date());

  // const changeCurrentDay = (day) => {
  //   this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  // };

  // return (
  //   <div className="flex justify-evenly w-full">
  //     <div className="w-1/3">
  //     <div >
  //       <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}
  //       </h2>
  //     </div>
  //       <div className="">
  //         <div className="flex items-center justify-around">
  //           {weekdays.map((weekday) => {
  //             return (
  //               <div className="y">
  //                 <p>{weekday}</p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         <CalenderDays day={currentDay} changeCurrentDay={changeCurrentDay} />
  //       </div>
  //     </div>
  //     <div className="w-2/5 h-128 overflow-y-scroll">
  // Click on any date to show bookings of that day
  //     </div>
  //   </div>
    // <div className="bg-muted p-4 rounded-lg" data-id="5">
    //   <div
    //     className="rdp p-0 [&amp;_td]:w-10 [&amp;_td]:h-10 [&amp;_th]:w-10 [&amp;_[name=day]]:w-10 [&amp;_[name=day]]:h-10 [&amp;>div]:space-x-0 [&amp;>div]:gap-6"
    //     data-id="6"
    //   >
    //     <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
    //       <div className="space-y-4 rdp-caption_start rdp-caption_end">
    //         <div className="flex justify-center pt-1 relative items-center">
    //           <div
    //             className="text-sm font-medium"
    //             aria-live="polite"
    //             role="presentation"
    //             id="react-day-picker-1"
    //           >
    //             October 2024
    //           </div>
    //           <div className="space-x-1 flex items-center">
    //             <button
    //               name="previous-month"
    //               aria-label="Go to previous month"
    //               className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
    //               type="button"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="24"
    //                 height="24"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="lucide lucide-chevron-left h-4 w-4"
    //               >
    //                 <path d="m15 18-6-6 6-6"></path>
    //               </svg>
    //             </button>
    //             <button
    //               name="next-month"
    //               aria-label="Go to next month"
    //               className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
    //               type="button"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="24"
    //                 height="24"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="lucide lucide-chevron-right h-4 w-4"
    //               >
    //                 <path d="m9 18 6-6-6-6"></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //         <table
    //           className="w-full border-collapse space-y-1"
    //           role="grid"
    //           aria-labelledby="react-day-picker-1"
    //         >
    //           <thead className="rdp-head">
    //             <tr className="flex">
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Sunday"
    //               >
    //                 Su
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Monday"
    //               >
    //                 Mo
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Tuesday"
    //               >
    //                 Tu
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Wednesday"
    //               >
    //                 We
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Thursday"
    //               >
    //                 Th
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Friday"
    //               >
    //                 Fr
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    //                 aria-label="Saturday"
    //               >
    //                 Sa
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="rdp-tbody">
    //             <tr className="flex w-full mt-2">
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   29
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   30
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="0"
    //                   type="button"
    //                 >
    //                   1
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   2
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   3
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   4
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   5
    //                 </button>
    //               </td>
    //             </tr>
    //             <tr className="flex w-full mt-2">
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   6
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   7
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   8
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   9
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   10
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   11
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   12
    //                 </button>
    //               </td>
    //             </tr>
    //             <tr className="flex w-full mt-2">
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   13
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   14
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   15
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   16
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   17
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   18
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   19
    //                 </button>
    //               </td>
    //             </tr>
    //             <tr className="flex w-full mt-2">
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   20
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   21
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   22
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   23
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   24
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   25
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   26
    //                 </button>
    //               </td>
    //             </tr>
    //             <tr className="flex w-full mt-2">
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   27
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   28
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   29
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   30
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   31
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   1
    //                 </button>
    //               </td>
    //               <td
    //                 className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
    //                 role="presentation"
    //               >
    //                 <button
    //                   name="day"
    //                   className="rdp-button_reset rdp-button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
    //                   role="gridcell"
    //                   tabIndex="-1"
    //                   type="button"
    //                 >
    //                   2
    //                 </button>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  // );
};

export default BookingsCalender;
