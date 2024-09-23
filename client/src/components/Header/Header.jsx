import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { loggedIn } from "../../store/atoms/login";
import { useRecoilState, useRecoilValue } from "recoil";
import Logo from "../Logo";
import { url } from "../../store/atoms/url";
import { IoMenu } from "react-icons/io5";

const Header = ({ setShowLogin, setLoginState }) => {
  const [page, setPage] = useState("Home");
  const [displayMenu, setDisplayMenu] = useState(false);
  const apiUrl = useRecoilValue(url);
  const [hasLoggedIn, setHasLoggedIn] = useRecoilState(loggedIn);

  const handleLoginOnClick = () => {
    setShowLogin(true);
    setLoginState(true);
  };
  const handleSignUpOnClick = () => {
    setShowLogin(true);
    setLoginState(false);
  };
  const handleLogoutOnClick = () => {
    fetch(`${apiUrl}api/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setHasLoggedIn(false);
    setPage("Home")
  };

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };
  return (
    <div>
      <div className="w-full ">
        <header className="flex justify-between flex-wrap  py-3 mb-4 border-bottom mr-2">
          <Logo setPage={setPage}></Logo>
          {hasLoggedIn ? (
            <div>
              <div
                className="flex md:hidden text-2xl items-center  relative "
                onClick={toggleMenu}
              >
                <p className="cursor-pointer">
                  <IoMenu />
                </p>
                <ul className={`border-2 text-base rounded bg-gray-100 w-48 flex flex-col absolute top-6 right-4 ${displayMenu?"flex":"hidden"}`}>
                  <li className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold">
                    <Link
                      to="/home"
                      className={` text-black`}
                      aria-current="page"
                      onClick={() => setPage("Home")}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold">
                    <Link to={"/calender"} className=""
                    onClick={() => setPage("View Calender")}>
                      View Calender
                    </Link>
                  </li>
                  <li className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold">
                    <Link to={"/pricing"} className=""
                    onClick={() => setPage("Pricing")}>
                      Pricing
                    </Link>
                  </li>
                  <li className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold">
                    <Link to={"/history"} className=""
                    onClick={() => setPage("History")}>
                      History
                    </Link>
                  </li>
                  <li className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold">
                    <Link to={"/about-us"} className=""
                    onClick={() => setPage("About Us")}>
                      About Us
                    </Link>
                  </li>

                  <Link to={"/home"}>
                    <li
                      className="cursor-pointer text-black px-2 py-1 text-center hover:font-bold"
                      onClick={handleLogoutOnClick}
                    >
                      Logout
                    </li>
                  </Link>
                </ul>
              </div>
              <ul className="nav nav-pills mr-4 hidden md:flex">
                <li
                  onClick={() => setPage("Home")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to="/home"
                    className={`nav-link ${
                      page === "Home" ? "bg-black text-white" : ""
                    } text-black`}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li
                  onClick={() => setPage("View Calender")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to={"/calender"}
                    className={`nav-link ${
                      page === "View Calender" ? "bg-black text-white" : ""
                    } text-black`}
                  >
                    View Calender
                  </Link>
                </li>
                <li
                  onClick={() => setPage("Pricing")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to={"/pricing"}
                    className={`nav-link ${
                      page === "Pricing" ? "bg-black text-white" : ""
                    } text-black`}
                  >
                    Pricing
                  </Link>
                </li>
                <li
                  onClick={() => setPage("History")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to={"/history"}
                    className={`nav-link ${
                      page === "History" ? "bg-black text-white" : ""
                    } text-black`}
                  >
                    History
                  </Link>
                </li>
                <li
                  onClick={() => setPage("About")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to={"/about-us"}
                    className={`nav-link ${
                      page === "About" ? "bg-black text-white" : ""
                    } text-black`}
                  >
                    About Us
                  </Link>
                </li>

                <Link to={"/home"}>
                  <button
                    className="ml-4 cursor-pointer rounded px-2 py-1 bg-white text-black border-2 border-black"
                    onClick={handleLogoutOnClick}
                  >
                    Logout
                  </button>
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              <div
                className="flex md:hidden text-2xl items-center  relative "
                onClick={toggleMenu}
              >
                <p className="cursor-pointer">
                  <IoMenu />
                </p>

                <ul
                  className={`border-2 text-base rounded bg-gray-100 w-48 flex flex-col absolute top-6 right-4 ${
                    displayMenu ? "block" : "hidden"
                  }`}
                >
                  <li
                    onClick={() => setPage("FAQs")}
                    className="cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold"
                  >
                    <Link to={"/about-us"}>About Us</Link>
                  </li>
                  <div className="flex flex-col">
                    <li
                      className=" cursor-pointer text-black border-b px-2 py-1 text-center hover:font-bold"
                      onClick={handleLoginOnClick}
                    >
                      Login
                    </li>
                    <li
                      className="cursor-pointer  text-black  px-2 py-1 text-center hover:font-bold"
                      onClick={handleSignUpOnClick}
                    >
                      Sign Up
                    </li>
                  </div>
                </ul>
              </div>
              <ul className="gap-8 items-center hidden md:flex">
                <li
                  onClick={() => setPage("About")}
                  className="nav-item nav-link-item"
                >
                  <Link
                    to={"/about-us"}
                    className={`nav-link ${
                      page === "About" ? "border-black pb-2 border-b-2 border-solid" : ""
                    } text-black`}
                  >
                    About Us
                  </Link>
                </li>
                <div className="flex gap-x-4">
                  <li
                    className="cursor-pointer rounded px-4 py-2 bg-black text-white"
                    onClick={handleLoginOnClick}
                  >
                    Login
                  </li>
                  <li
                    className="cursor-pointer border-2 rounded px-2 py-2 border-black"
                    onClick={handleSignUpOnClick}
                  >
                    Sign Up
                  </li>
                </div>
              </ul>
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

export default Header;
