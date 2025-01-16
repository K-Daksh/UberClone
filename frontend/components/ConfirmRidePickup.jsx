import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ConfirmRidePickup = (props) => {
  if (props.ride === null) {
    return <div>Loading...</div>;
  }
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const handleSubmit = async (e) => {
    console.log("Submit pressed", otp);
    e.preventDefault();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };
  const formatAddress = (address) => {
    const firstCommaIndex = address.indexOf(",");
    const firstPart = address.substring(0, firstCommaIndex);
    const secondPart = address.substring(firstCommaIndex + 1).trim();
    return { firstPart, secondPart };
  };
  const { firstPart, secondPart } = formatAddress(props.ride?.pickup);
  const { firstPart: firstPartDest, secondPart: secondPartDest } =
    formatAddress(props.ride?.destination);
  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <div className="flex flex-col justify-center items-center py-3 ">
          <h2 className="text-2xl font-semibold">Confirm to start the ride</h2>
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
              {props.ride.user.fullname.firstname +
                " " +
                props.ride.user.fullname.lastname}
            </h2>
          </div>
          <h2 className="text-xl font-semibold"></h2>
        </div>
        <div className="w-full flex justify-center items-center p-[15px] mb-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center w-[80%] bg-gray-200 py-2 rounded-lg text-lg font-semibold font-mono"
            type="number"
            required
            placeholder="Enter OTP"
          />
        </div>
        <div className="flex flex-col justify-start items-start mx-2">
          <div className="flex flex-row justify-start w-screen ml-2">
            <div className="flex items-center justify-center w-[20%]">
              <i className="ri-map-pin-range-fill ri-xl"></i>
            </div>
            <div className="flex flex-col justify-start items-start w-full mr-5">
              <h2 className="text-xl font-semibold">{firstPart}</h2>
              <h4 className="text-sm">{secondPart}</h4>
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
              <h2 className="text-xl font-semibold">{firstPartDest}</h2>
              <h4 className="text-sm">{secondPartDest}</h4>
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
              <h2 className="text-xl font-semibold">₹{props.ride.fare}</h2>
              <h4 className="text-sm">Cash Cash</h4>
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
              // to="/captain-riding"
              onClick={() => {
                handleSubmit();
              }}
              style={{
                width: "60%",
                padding: "5px",
                paddingBottom: "8px",
                background: "linear-gradient(to right, #1d976c, #93f9b9)",
              }}
              className="bg-green-600 text-white text-xl font-semibold rounded-lg text-center"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePickup(false);
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
        </div>
      </div>
    </form>
  );
};

export default ConfirmRidePickup;
