import React from "react";

const DriverSelected = (props) => {
  const formatAddress = (address) => {
    const firstCommaIndex = address.indexOf(",");
    const firstPart = address.substring(0, firstCommaIndex);
    const secondPart = address.substring(firstCommaIndex + 1).trim();
    return { firstPart, secondPart };
  };
  if (!props.ride)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  console.log(props.ride);
  const { firstPart, secondPart } = formatAddress(props.ride.pickup);
  return (
    <>
      <div
        style={{ padding: "15px" }}
        className="flex flex-row justify-between items-center"
      >
        <h2 className="text-2xl font-semibold font-sans px-2.5">OTP</h2>
        <h2 className="text-2xl font-semibold font-sans px-2.5">
          {props.ride.otp}
        </h2>
      </div>
      <div
        className="mb-2"
        style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
      ></div>
      <div
        style={{ padding: "15px" }}
        className="flex flex-row justify-between items-center"
      >
        <div style={{ width: "25%" }} className="w-[25%]">
          <img
            style={{ width: "70px", height: "70px" }}
            className="rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-zbJg0P98SwYoQJCjzTONpVf1dB9pB9VCQ&s"
            alt=""
          />
        </div>
        <div style={{ textAlign: "right" }} className="">
          <h3 className="text-sm font-semibold">
            {props.ride.captain.fullname.firstname}
          </h3>
          <h2 className="text-xl font-semibold">
            {props.ride.captain.vehicle.plate}
          </h2>
          <h3 className="text-sm font-light">
            {props.ride.captain.vehicle.color}
          </h3>
          <div className="flex flex-row justify-end items-center">
            <i className="ri-star-fill ri-xs"></i>
            <h4 className="text-sm font-semibold">4.9</h4>
          </div>
        </div>
      </div>
      <div
        className="mb-2"
        style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
      ></div>
      <div className="mt-5 mb-5">
        <div className="flex flex-row justify-start w-screen ml-2">
          <div className="flex items-center justify-center w-[20%]">
            <i className="ri-map-pin-range-fill ri-xl"></i>
          </div>
          <div className="flex flex-col justify-start items-start w-full mr-5">
            <h2 className="text-2xl font-semibold">{firstPart}</h2>
            <h4 className="text-sm">{secondPart}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverSelected;
