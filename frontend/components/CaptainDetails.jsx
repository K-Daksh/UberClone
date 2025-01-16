import { useGSAP } from "@gsap/react";
import React, { useContext } from "react";
import gsap from "gsap";
import { CaptainDataContext } from "./../src/context/CaptainContext";

import "remixicon/fonts/remixicon.css";
const CaptainDetails = () => {
  // console.log(props.captain);
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  return (
    <div>
      <div
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "15px",
        }}
        className="flex flex-row justify-start items-center"
      >
        <div className="px-1">
          <img
            style={{ width: "50px", height: "50px" }}
            className="rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-zbJg0P98SwYoQJCjzTONpVf1dB9pB9VCQ&s"
            alt=""
          />
        </div>
        <div className="px-2">
          <h3 className="text-lg font-semibold capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h3>
          <div className="flex flex-row justify-start items-center">
            <i className="ri-star-fill ri-xs"></i>
            <h4 className="text-sm font-semibold">4.9</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center bg-white w-screen rounded-lg p-[15px]">
        <div className="flex flex-row justify-around items-center bg-gray-200 w-screen rounded-lg p-3">
          <div className="flex flex-col justify-center items-center text-center">
            <i className="ri-time-line ri-2x"></i>
            <h2 className="text-xl font-semibold">10.2</h2>
            <h4 className="text-xs font-light">HOURS ONLINE</h4>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <i className="ri-speed-up-line ri-2x"></i>
            <h2 className="text-xl font-semibold">30 KM</h2>
            <h4 className="text-xs font-light">TOTAL DISTANCE</h4>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <i className="ri-money-rupee-circle-line ri-2x"></i>
            <h2 className="text-xl font-semibold">2L</h2>
            <h4 className="text-xs font-light">TOTAL EARNING</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
