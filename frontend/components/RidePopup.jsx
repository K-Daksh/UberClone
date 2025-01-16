import React from "react";

const RidePopup = (props) => {
  if (!props.ride) return <div>Loading...</div>;
  const destinationAd = props.ride?.destination;
  const pickupAd = props.ride?.pickup;
  const fare = props.ride?.fare;

  const formatAddress = (address) => {
    const firstCommaIndex = address.indexOf(",");
    const firstPart = address.substring(0, firstCommaIndex);
    const secondPart = address.substring(firstCommaIndex + 1).trim();
    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = formatAddress(destinationAd);

  const { firstPart: firstPartPickup, secondPart: secondPartPickup } =
    formatAddress(pickupAd);

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-3 ">
        <h2 className="text-2xl font-semibold">New Ride Available</h2>
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
            <h2 className="text-xl font-semibold">{firstPartPickup}</h2>
            <h4 className="text-sm">{secondPartPickup}</h4>
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
            <h2 className="text-xl font-semibold">₹{fare}</h2>
            <h4 className="text-sm">Cash Cash</h4>
            <div
              className="my-2"
              style={{ height: "2px", width: "100%", background: "#D6D6D6" }}
            ></div>
          </div>
        </div>
      </div>
      <div
        style={{ padding: "20px" }}
        className="flex flex-row items-center justify-around gap-3"
      >
        <button
          onClick={() => {
            props.confirmRide();
          }}
          style={{
            width: "60%",
            padding: "5px",
            paddingBottom: "8px",
            background: "linear-gradient(to right, #1d976c, #93f9b9)",
          }}
          className="bg-green-600 text-white text-xl font-semibold rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
          }}
          style={{
            width: "60%",
            padding: "5px",
            paddingBottom: "8px",
            background: "linear-gradient(to right, #cb2d3e, #ef473a)",
          }}
          className="bg-red text-white font-semibold text-xl rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
