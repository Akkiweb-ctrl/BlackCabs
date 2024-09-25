import React, { useContext, useRef, useState } from "react";
import styles from "./NewBooking.module.css";
import { BookingsContext } from "../../store/BookingsContext";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { url } from "../../store/atoms/url";
import ClipLoader from "react-spinners/ClipLoader";

// const {formatISO9075} = require('date-fns');

const NewBooking = () => {
  const { setBooking } = useContext(BookingsContext);
  const apiUrl = useRecoilValue(url);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cab, setCab] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [errors, setErrors] = useState();
  const [bookingProcess, setBookingProcess] = useState(false);

  const validationSchema = Yup.object({
    source: Yup.string()
      .min(2, "Pick up must be atleast 2 characters long")
      .required("Pick up is required"),
    destination: Yup.string()
      .min(2, "Drop off must be atleast 2 characters long")
      .required("Drop off is required"),
    date: Yup.string().required("Date is required"),
    numberOfPeople: Yup.number()
      .required("Field is required")
      .positive("Number must be greater than 0")
      .integer("Number must be an integer"),
    time: Yup.string().required("Time is required"),
    cab: Yup.string().required("Cab is required"),
  });

  const bookCab = async () => {
    const res = await fetch(`${apiUrl}api/booking/add-booking`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        source,
        destination,
        date,
        time,
        cab,
        numberOfPeople,
        specialRequest,
      }),
      headers: { "Content-type": "application/json" },
    });
    if (res.ok) {
      // console.log(time)
      setBooking(await res.json());
      alert("Cab booked successfully");
      setSource("");
      setDestination("");
      setDate("");
      setTime("");
      setCab("");
      setNumberOfPeople(1);
      setSpecialRequest("");
      setBookingProcess(false);
    }
  };
  const handleBookCab = async (event) => {
    event.preventDefault();
    setBookingProcess(true)
    try {
      await validationSchema.validate(
        { source, destination, date, numberOfPeople, time,cab },
        { abortEarly: false }
      );
      bookCab();
      setErrors({});
      // login()
    } catch (error) {
      let newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
        console.log(errors);
        setErrors(newErrors);
        setBookingProcess(false);
      });
    }
  };
  return (
    <div className={`w-130 min-w-96 mr-2  ml-2 lg:mr-8 lg:ml-4 mb-16 xl:mb-0`}>
      <div>
        <h3 className="mb-8 font-bold text-lg">New Booking</h3>
      </div>
      <form
        className={` border rounded-lg border-solid border-slate-300 p-4   flex flex-col gap-4`}
      >
        <div className={`flex justify-around gap-2 flex-wrap`}>
          <div className={`flex flex-col `}>
            <label className="text-sm font-semibold" htmlFor="pickup-location">
              Pickup location
            </label>
            <input
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="text"
              id="pickup-location"
              value={source}
              onChange={(ev) => setSource(ev.target.value)}
              required
            />
            {errors && errors.source && (
              <p className="text-red-600">{errors.source}</p>
            )}
          </div>
          <div className={`flex flex-col `}>
            <label className="text-sm font-semibold" htmlFor="dropoff-location">
              Dropoff location
            </label>
            <input
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="text"
              id="dropoff-location"
              value={destination}
              onChange={(ev) => setDestination(ev.target.value)}
              required
            />
            {errors && errors.destination && (
              <p className="text-red-600">{errors.destination}</p>
            )}
          </div>
        </div>

        <div className={`flex justify-around gap-2 flex-wrap`}>
          <div className={`flex flex-col`}>
            <label className="text-sm font-semibold" htmlFor="date">
              Date
            </label>
            <input
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="date"
              id="date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
              required
            />
            {errors && errors.date && (
              <p className="text-red-600">{errors.date}</p>
            )}
          </div>
          <div className={`flex flex-col `}>
            <label className="text-sm font-semibold" htmlFor="time">
              Time
            </label>
            <input
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="time"
              id="time"
              value={time}
              onChange={(ev) => setTime(ev.target.value)}
              required
            />
            {errors && errors.time && (
              <p className="text-red-600">{errors.time}</p>
            )}
          </div>
        </div>
        {/* //flex justify-around gap-2 flex-wrap */}
        <div className={`flex justify-around gap-2 flex-wrap `}>
          <div className={`flex flex-col `}>
            <label className="text-sm font-semibold" htmlFor="noOfPeople">
              Number of people
            </label>
            <input
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="number"
              id="Number of people"
              value={numberOfPeople}
              onChange={(ev) => setNumberOfPeople(ev.target.value)}
              required
            />
            {errors && errors.numberOfPeople && (
              <p className="text-red-600">{errors.numberOfPeople}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label htmlFor="cab" className="text-sm font-semibold">
              Cab
            </label>
            <select
              id="cab"
              className={`p-1 w-60 border border-solid border-slate-300 rounded text-lg`}
              onChange={(e) => setCab(e.target.value)}
            >
              <option defaultValue={cab}>Select Cab</option>
              <option value="Radhe Radhe">Swift Dezire</option>
              <option value="Technology">Tata Indigo</option>
              <option value="Food">Toyato Innova</option>
              <option value="Travel">Maruti Suzuki Ertiga</option>
              <option value="Gaming">Maruti Suzuki Ciaz</option>
              <option value="Gaming">Mahindra Marazzo</option>
            </select>
            {errors && errors.cab && (
              <p className="text-red-600">{errors.cab}</p>
            )}
          </div>
        </div>
        <div className={`flex justify-around  items-end gap-2 flex-wrap `}>
          <div className={`flex flex-col `}>
            <label className="text-sm font-semibold" htmlFor="noOfPeople">
            Specai Request
            </label>
            <textarea
              className=" p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              id="Specai Request"
              value={specialRequest}
              onChange={(ev) => setSpecialRequest(ev.target.value)}
              required
            ></textarea>
            {errors && errors.specialRequest && (
              <p className="text-red-600">{errors.specialRequest}</p>
            )}
          </div>
          <div className="flex flex-col ">
            
            <button
              onClick={handleBookCab}
              type="Submit"
              className={`p-1 w-60 justify-center items-center flex gap-4 bg-black text-white  rounded text-lg mt-4 2xl:mt-0`}
              onChange={(e) => setCab(e.target.value)}
            >
             Book Cab 
             {bookingProcess && <ClipLoader size={16} color="#ffffff"/>}
            </button>
          </div>
        </div>
        {/* <div className="flex justify-around gap-2">
          <div className={`flex flex-col  `}>
            <label className="text-sm font-semibold" htmlFor="time">
              Specai Request
            </label>
            <textarea
              className="max-h-28 min-h-28 p-1 w-60 border border-solid border-slate-300 rounded text-lg"
              type="time"
              id="time"
              value={time}
              onChange={(ev) => setTime(ev.target.value)}
              required
            ></textarea>
          </div>
          <div className={`w-full  ml-4`}>
            <button
              onClick={handleBookCab}
              type="Submit"
              className={` p-1 px-2 text-lg bg-black text-white border-none rounded`}
            >
              Book cab
            </button>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default NewBooking;
