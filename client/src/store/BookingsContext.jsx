import { createContext, useState } from "react";
import { useRecoilValue } from "recoil";
import { ToReschedule } from "./atoms/toReschedule";

export const BookingsContext = createContext({});

// const DEFAULT_BOOKINGS = [
//     {
//         time:"2024-08-15 - 09:00",
//         pickup:"123 Main St, Anytown USA",
//         dropoff:"456 Oak Rd, Anytown USA ",
//         specialRequests: "Please have a car seat available"
//     },
//     {
//         time:"2024-08-15 - 09:00",
//         pickup:"123 Main St, Anytown USA",
//         dropoff:"456 Oak Rd, Anytown USA ",
//         specialRequests: "Please have a car seat available"
//     },
//     {
//         time:"2024-08-15 - 09:00",
//         pickup:"123 Main St, Anytown USA",
//         dropoff:"456 Oak Rd, Anytown USA ",
//         specialRequests: "Please have a car seat available"
//     },

// ]

const BookingsContextProvider = ({ children }) => {
  const [bookingList, setBookingList] = useState([]);
  const [booking, setBooking] = useState({});
const toReschedule = useRecoilValue(ToReschedule)

  const addBooking = (newBooking) => {
    const newBookingList = [...bookingList, newBooking];
    setBookingList(newBookingList);
  };
  const cancelBooking = (deleteItem) => {
    let newBookingList = [...bookingList];
    newBookingList = newBookingList.filter(
      (booking) => booking.time !== deleteItem.time
    );
    setBookingList(newBookingList);
  };

  const updateBooking = (booking) => {
    const newBookingList = bookingList.map((item) =>
      item._id === toReschedule._id
        ? {
            ...item,
            pickup: booking.pickup,
            dropoff: booking.dropoff,
            time: booking.time,
            specialRequests: booking.specialRequests,
          }
        : item
    );
    setBookingList(newBookingList);
  };
  const contextValue = {
    bookingList,
    addBooking,
    cancelBooking,
    updateBooking,
    setBookingList,
    booking,
    setBooking

  };
  return (
    <BookingsContext.Provider value={contextValue}>
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
