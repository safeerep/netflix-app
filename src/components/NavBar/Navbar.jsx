import React from "react";
import { netflixIcon } from "../Constants/constants";

function Navbar() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <i className="flex items-center text-white ml-5 fa-solid fa-bars fa-lg"></i>
        <img
          className="w-200 h-20 ml-5"
          src= {netflixIcon}
          alt=""
        />
      </div>
      <div className="flex items-center mr-10 text-white">
        <i className="mr-10 fa-solid fa-magnifying-glass"></i>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  );
}

export default Navbar;
