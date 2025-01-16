import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FinishRide = ({ setFinishRidePanel, ride }) => {
  const [check, setCheck] = React.useState(false);
  const navigate = useNavigate();

  const notify = () => {
    toast.error("Please check the bottom box", {
      position: "top-center",
      autoClose: 5000,
      zIndex: 9999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "w-5/6 mt-3 text-center text-lg ",
    });
  };

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  const handleFinish = () => {
    if (check) {
      endRide();
    } else {
      notify();
    }
  };

  const formatAddress = (address) => {
    const firstCommaIndex = address.indexOf(",");
    const firstPart = address.substring(0, firstCommaIndex);
    const secondPart = address.substring(firstCommaIndex + 1).trim();
    return { firstPart, secondPart };
  };

  const { firstPart: pickupFirstPart, secondPart: pickupSecondPart } =
    formatAddress(ride.pickup);
  const { firstPart: destinationFirstPart, secondPart: destinationSecondPart } =
    formatAddress(ride.destination);

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-3 ">
        <h2 className="text-2xl font-semibold">Finish this Ride</h2>

        <div
          className="mt-2"
          style={{
            background: "linear-gradient(to right, #00dbde, #fc00ff)",
            height: "3px",
            width: "80%",
            borderRadius: "50px",
            clipPath: "polygon(0% 100%, 0% 55%, 55% 0%, 100% 55%, 100% 100%)",
          }}
        ></div>
      </div>

      <div
        style={{
          background: "linear-gradient(to right, #f2994a, #f2c94c)",
        }}
        className="flex flex-row justify-between items-center m-[15px] p-2 bg-[#f2994a] rounded-lg text-white"
      >
        <div className="flex flex-row justify-start items-center">
          <img
            className="w-[55px] rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Albert_Einstein_1947_square_cropped.jpg"
            alt="userImage"
          />
          <h2 className="text-xl font-semibold pl-2">
            {ride.user.fullname.firstname} {ride.user.fullname.lastname}
          </h2>
        </div>
        <h2 className="text-2xl font-semibold">{}</h2>
      </div>

      <div className="flex flex-col justify-start items-start mx-2">
        <div className="flex flex-row justify-start w-screen ml-2">
          <div className="flex items-center justify-center w-[20%]">
            <i className="ri-map-pin-range-fill ri-xl"></i>
          </div>
          <div className="flex flex-col justify-start items-start w-full mr-5">
            <h2 className="text-xl font-semibold">{pickupFirstPart}</h2>
            <h4 className="text-sm">{pickupSecondPart}</h4>
            <div
              className="my-2"
              style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row justify-start w-screen ml-2">
          <div className="flex items-center justify-center w-[20%]">
            <i className="ri-square-fill"></i>
          </div>
          <div className="flex flex-col justify-start items-start w-full mr-5">
            <h2 className="text-xl font-semibold">{destinationFirstPart}</h2>
            <h4 className="text-sm">{destinationSecondPart}</h4>
            <div
              className="my-2"
              style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row justify-start w-screen ml-2">
          <div className="flex items-center justify-center w-[20%]">
            <i className="ri-bank-card-2-fill"></i>
          </div>
          <div className="flex flex-col justify-start items-start w-full mr-5">
            <h2 className="text-xl font-semibold">₹{ride.fare}</h2>
            <h4 className="text-sm">Cash</h4>
            <div
              className="my-2"
              style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <div
          style={{ padding: "20px" }}
          className="flex flex-row items-center justify-around gap-3"
        >
          <button
            onClick={handleFinish}
            style={{
              width: "60%",
              padding: "5px",
              paddingBottom: "8px",
              background: "linear-gradient(to right, #1d976c, #93f9b9)",
            }}
            className="bg-green-600 text-white text-xl font-semibold rounded-lg text-center"
          >
            Finish
          </button>
          <button
            onClick={() => {
              setFinishRidePanel(false);
            }}
            style={{
              width: "60%",
              padding: "5px",
              paddingBottom: "8px",
              background: "linear-gradient(to right, #cb2d3e, #ef473a)",
            }}
            className="bg-red text-white font-semibold text-xl rounded-lg"
          >
            Cancel
          </button>
        </div>

        <div className="flex justify-center items-start p-4 bg-gray-100">
          <input
            type="checkbox"
            required
            className="mt-[1px] mr-1"
            value={check}
            onChange={() => {
              setCheck(!check);
            }}
          />

          <p className="text-center text-[11px] text-gray-600">
            Click on the Finish Ride button only if payment was successful in
            case of Cash Payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
