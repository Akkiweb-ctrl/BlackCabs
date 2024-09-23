import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BookingsContextProvider from "./store/BookingsContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home.jsx";
// import FAQs from "./pages/FAQs.jsx";
// import LandingPage from "./pages/LandingPage.jsx";
// import BookingsCalender from "./components/BookingsCalender/BookingsCalender.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Pricing from "./components/Pricing/Pricing.jsx";
import History from "./pages/History.jsx";
import Calender from "./components/Calender.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path : "/", element:<Home/>},
      {path : "/home", element:<Home/>},
      {path : "/history", element:<History/>},
      {path : "/calender", element:<Calender/>},
      {path : "/about-us", element:<AboutUs/>},
      {path : "/pricing", element:<Pricing/>},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BookingsContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </BookingsContextProvider>
    </RecoilRoot>
  </React.StrictMode>
);
