import React from "react";
import { Link } from "react-router-dom";

const Logo = ({setPage}) => {
  return (
    <Link
      to={"/home"}
      className=" mx-4 flex items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      onClick={()=>setPage("Home")}
    >
      {/* <img className="w-44" src="../../../public/static/images/logo.png" alt="logo" /> */}
      <span className={`fs-4 font-black`}>Black Cabs</span>
    </Link>
  );
};

export default Logo;
