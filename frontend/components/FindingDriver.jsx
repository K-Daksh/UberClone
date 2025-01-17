import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const FindingDriver = (props) => {
  // const navigate = useNavigate();

  // const notify = () => {
  //   toast.error("No drivers available", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     zIndex: 9999,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     className: "w-5/6 mt-3 text-center text-lg ",
  //     onClose: () => {
  //       setTimeout(() => {
  //         navigate("/home");
  //       }, 5000); // Wait for 5 seconds before navigating
  //     },
  //   });
  // };

  const formatAddress = (address) => {
    if (!address) return { firstPart: "", secondPart: "" };
    const firstCommaIndex = address.indexOf(",");
    if (firstCommaIndex === -1) return { firstPart: address, secondPart: "" };
    const firstPart = address.substring(0, firstCommaIndex);
    const secondPart = address.substring(firstCommaIndex + 1).trim();
    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = formatAddress(props.pickup);
  const { firstPart: destFirstPart, secondPart: destSecondPart } =
    formatAddress(props.destination);

  // const [time, setTime] = useState(null); // Time in seconds
  // const [isRunning, setIsRunning] = useState(false);

  // useEffect(() => {
  //   let timer;
  //   if (isRunning) {
  //     timer = setInterval(() => {
  //       setTime((prevTime) => prevTime - 1);
  //       console.log(time);
  //     }, 1000);
  //   }
  //   return () => clearInterval(timer); // Cleanup the interval on component unmount or when isRunning changes
  // }, [isRunning, time]);

  // if (props.vehicleFound && !isRunning) {
  //   console.log("timer started");
  //   setTime(30);
  //   setIsRunning(true);
  // }
  // if (isRunning && time <= 0) {
  //   setIsRunning(false);
  //   setTime(null);
  //   props.setVehicleFound(false);
  //   console.log("timer stopped");
  //   navigate("/home");
  // }
  const image = {
    car: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-3 ">
        <div className="flex flex-row justify-center items-center">
          <h2 className="text-2xl font-semibold">Finding Drivers</h2>
          <div className="mx-2" role="status">
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>

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

      <div className="flex justify-center items-center">
        <img
          style={{ width: "50%" }}
          className="w-[50%] mb-3"
          src={image[props.selectedVehicle]}
          alt="Image"
        />
      </div>

      <div className="flex flex-col justify-start items-start mx-2 mb-3">
        <div
          className="my-2"
          style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
        ></div>
        <div className="flex flex-row justify-start w-screen ml-2">
          <div className="flex items-center justify-center w-[20%]">
            <i className="ri-map-pin-range-fill ri-xl"></i>
          </div>
          <div className="flex flex-col justify-start items-start w-full mr-5">
            <h2 className="text-xl font-semibold">{firstPart}</h2>
            <h4 className="text-sm pr-2">
              {secondPart.length > 60
                ? `${secondPart.substring(0, 60)}...`
                : secondPart}
            </h4>
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
            <h2 className="text-xl font-semibold">{destFirstPart}</h2>
            <h4 className="text-sm pr-2">
              {destSecondPart.length > 60
                ? `${destSecondPart.substring(0, 60)}...`
                : destSecondPart}
            </h4>
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
            <h2 className="text-xl font-semibold">
              ₹{Math.ceil(props.selectedPrice)}
            </h2>
            <h4 className="text-sm">Cash or UPI Only</h4>
            <div
              className="my-2"
              style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindingDriver;
