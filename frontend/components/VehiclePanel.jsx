import React from "react";

// Define the formatDuration function
const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
const handleVehicleSelection = (vehicle, price) => {
  props.setSelectedVehicle(vehicle);
  props.setSelectedPrice(price);
};
const VehiclePanel = (props) => {
  if (props.distance?.status != "OK") {
    return (
      <div className="w-full h-[70vw] flex flex-col justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    );
  }

  return (
    <div>
      <div
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="flex justify-center items-center w-full mt-5"
      >
        <div
          style={{ height: "35px" }}
          className="bg-white flex justify-center items-center w-1/2 h-5 rounded-3xl"
        >
          <i className="ri-arrow-down-wide-fill ri-2x"></i>
        </div>
      </div>

      <div className="m-2.5 mt-3">
        <div
          onClick={() => {
            props.setSelectedVehicle("car");
            props.setSelectedPrice(props.prices.car);
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
          }}
          className="bg-gray-100 flex flex-row justify-start w-[100%] h-23 py-1 rounded-xl   my-2"
        >
          <div
            style={{ width: "30%" }}
            className="w-[30%] flex items-center justify-center"
          >
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
              alt="carImage"
            />
          </div>

          <div className="w-[50%] flex flex-col justify-center items-start py-2 px-1 ">
            <div className="flex flex-row justify-start items-center">
              <h1 className="text-2xl font-semibold">UberGo</h1>
              <div className="mx-2 flex items-center justify-center">
                <i className="ri-user-fill ri-sm"></i>
                <h4>4</h4>
              </div>
            </div>

            <h2 className="text-sm font-light">
              {formatDuration(props.distance.duration.value)} |{" "}
              {new Date(
                Date.now() + props.distance.duration.value * 1000 * 1.0
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </h2>
            <h2 className="text-sm font-light">Comfortable, spacious</h2>
          </div>

          <div className="w-[20%] text-2xl py-2 flex flex-col justify-start items-center">
            <h2 className="text-2xl font-semibold pt-0.5">
              ₹{Math.ceil(props.prices.car)}
            </h2>
          </div>
        </div>
        <div
          onClick={() => {
            props.setSelectedVehicle("moto");
            props.setSelectedPrice(props.prices.moto);
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
          }}
          className="bg-gray-100 flex flex-row justify-start w-[100%] h-23 py-1 rounded-xl   my-2"
        >
          <div
            style={{ width: "30%" }}
            className="w-[30%] flex items-center justify-center"
          >
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="motoImage"
            />
          </div>

          <div className="w-[50%] flex flex-col justify-center items-start py-2 px-1 ">
            <div className="flex flex-row justify-start items-center">
              <h1 className="text-2xl font-semibold">Moto</h1>
              <div className="mx-2 flex items-center justify-center">
                <i className="ri-user-fill ri-sm"></i>
                <h4>2</h4>
              </div>
            </div>

            <h2 className="text-sm font-light">
              {formatDuration(props.distance.duration.value * 0.85)} |{" "}
              {new Date(
                Date.now() + props.distance.duration.value * 1000 * 0.85
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </h2>
            <h2 className="text-sm font-light">Affordable, fast</h2>
          </div>

          <div className="w-[20%] text-2xl py-2 flex flex-col justify-start items-center">
            <h2 className="text-2xl font-semibold pt-0.5">
              ₹{Math.ceil(props.prices.moto)}
            </h2>
          </div>
        </div>
        <div
          onClick={() => {
            props.setSelectedVehicle("auto");
            props.setSelectedPrice(props.prices.auto);
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
          }}
          className="bg-gray-100 flex flex-row justify-start w-[100%] h-23 py-1 rounded-xl   my-2"
        >
          <div
            style={{ width: "30%" }}
            className="w-[30%] flex items-center justify-center"
          >
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              alt="AutoImage"
            />
          </div>

          <div className="w-[50%] flex flex-col justify-center items-start py-2 px-1 ">
            <div className="flex flex-row justify-start items-center">
              <h1 className="text-2xl font-semibold">UberAuto</h1>
              <div className="mx-2 flex items-center justify-center">
                <i className="ri-user-fill ri-sm"></i>
                <h4>3</h4>
              </div>
            </div>

            <h2 className="text-sm font-light">
              {formatDuration(props.distance.duration.value * 0.94)} |{" "}
              {new Date(
                Date.now() + props.distance.duration.value * 1000 * 0.94
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </h2>
            <h2 className="text-sm font-light">Affordable, compact sized</h2>
          </div>

          <div className="w-[20%] text-2xl py-2 flex flex-col justify-start items-center">
            <h2 className="text-2xl font-semibold pt-0.5">
              ₹{Math.ceil(props.prices.auto)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
