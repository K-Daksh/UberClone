import React, { useEffect, useContext, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmedRide from "../../components/ConfirmedRide";
import FindingDriver from "../../components/FindingDriver";
import DriverSelected from "../../components/DriverSelected";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../../components/LiveTracking";

function Home() {
  const sumbitHandler = (e) => {
    e.preventDefault();
  };
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const serachRef = React.useRef(null);
  const vehicleRef = React.useRef(null);
  const arrowRef = React.useRef(null);
  const vehicleFoundRef = React.useRef(null);
  const driverSelectedRef = React.useRef(null);
  const confirmRidePanelRef = React.useRef(null);
  const [vehiclePanel, setVehiclePanel] = React.useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = React.useState(false);
  const [vehicleFound, setVehicleFound] = React.useState(false);
  const [driverSelected, setDriverSelected] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]); // Initialize as empty array
  const [activeInput, setActiveInput] = React.useState(null); // 'pickup' or 'destination'
  const [prices, setPrices] = React.useState([]);
  const [distance, setDistance] = React.useState([]);
  const [selectedVehicle, setSelectedVehicle] = React.useState(null);
  const [selectedPrice, setSelectedPrice] = React.useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  // const socket = io(`${import.meta.env.VITE_BASE_URL}`);

  // console.log(user._id);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
    // console.log("User socket id is ", socket.id);
  }, []);

  socket.on("ride-started", (ride) => {
    // console.log("ride started");
    setDriverSelected(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { address: query },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response);
      // Make sure we're setting an array of predictions
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Reset to empty array on error
    }
  };

  const fetchPrices = async (destination, pickup) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-prices`,
        {
          params: { origin: pickup, destination: destination },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      // Make sure we're setting an array of predictions
      setPrices(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setPrices([]); // Reset to empty array on error
    }
  };

  const fetchDistance = async (destination, pickup) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distance`,
        {
          params: { origin: pickup, destination: destination },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      // Make sure we're setting an array of predictions
      setDistance(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setDistance([]); // Reset to empty array on error
    }
  };

  socket.on("ride-confirmed", (ride) => {
    // console.log("ride confirmed has been called");
    setVehicleFound(false);
    setDriverSelected(true);
    setRide(ride);
  });

  if (
    vehiclePanel == true &&
    pickup !== "" &&
    destination !== "" &&
    prices.length === 0
  ) {
    fetchPrices(destination, pickup);
    fetchDistance(destination, pickup);
  }

  const handleSuggestionSelect = (suggestion) => {
    if (activeInput === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setSuggestions([]);
    setPanelOpen(false);

    // Only show vehicle panel if both fields are filled
    if (activeInput === "pickup" && destination !== "") {
      setVehiclePanel(true);
    } else if (activeInput === "destination" && pickup !== "") {
      setVehiclePanel(true);
    }
  };

  async function createRide() {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicle: selectedVehicle,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehicleRef.current, {
          y: "0%",
          delay: 0.3,
          // transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleRef.current, {
          y: "100%",
          // transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (driverSelected) {
        gsap.to(driverSelectedRef.current, {
          y: "0%",
          delay: 0.3,
          // transform: "translateY(0%)",
        });
      } else {
        gsap.to(driverSelectedRef.current, {
          y: "100%",
          // transform: "translateY(100%)",
        });
      }
    },
    [driverSelected]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          y: "0%",
          delay: 0.3,
          // transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          y: "100%",
          // transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          y: "0%",
          delay: 0.3,
          // transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          y: "100%",
          // transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(titleRef.current, {
          display: "none",
          duration: 0.3,
        });
        gsap.to(panelRef.current, {
          height: "68%",
          display: "flex",
          duration: 0.5,
          delay: 0.2,
          opacity: 1,
        });
        gsap.to(arrowRef.current, {
          display: "block",
          duration: 0.5,
          delay: 0.5,
        });
      } else {
        gsap.to(arrowRef.current, {
          display: "none",
          duration: 0.3,
        });
        gsap.to(panelRef.current, {
          height: "0%",
          display: "none",
          duration: 0.5,
          delay: 0.2,
          opacity: 0,
        });
        gsap.to(titleRef.current, {
          display: "block",
          duration: 0.5,
          delay: 0.3,
        });
      }
    },
    [panelOpen]
  );

  return (
    <div className="h-screen position-relative w-screen">
      <div>
        <img
          className="absolute w-16 ml-7 pt-7 z-30"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
          alt="logo"
        />
      </div>
      {/* <div> */}
      {/* <img
          onClick={() => {
            setVehiclePanel(false);
            setPanelOpen(false);
          }}
          className=""
          src={mapBanner}
          alt="mapBanner"
        />
      </div> */}
      <div
        className="absolute w-screen h-[100%] top-0 z-20"
        onClick={() => {
          setVehiclePanel(false);
          setPanelOpen(false);
        }}
      >
        <LiveTracking />
      </div>
      <div
        ref={serachRef}
        className="absolute flex flex-col justify-end top-0 h-screen w-full rounded-t-lg"
      >
        <div className="h-[32%] bg-white p-5 flex flex-col justify-around z-50">
          <h4 ref={titleRef} className="text-3xl font-semibold ml-1">
            Find a ride
          </h4>
          <i
            onClick={() => {
              setPanelOpen(false);
            }}
            ref={arrowRef}
            className="ri-arrow-down-s-line text-2xl hidden"
          ></i>
          <form className="relative" action="" onSubmit={sumbitHandler}>
            <div className="line absolute self-center h-[51%] w-1 bottom-1/4 ml-8 bg-black rounded-3xl">
              <div className="circle absolute h-3 w-3 bg-black rounded-full top-0 ml-[-4px]"></div>
              <div className="circle absolute h-3 w-3 bg-black rounded-full bottom-0 ml-[-4px]"></div>
            </div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("pickup");
              }}
              onChange={(e) => {
                setPickup(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] rounded-lg px-3 py-3 text-lg w-full mt-2 mb-2 pl-16"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("destination");
              }}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eee] rounded-lg px-3 py-3 text-lg w-full mt-2 mb-2 pl-16"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div
          ref={panelRef}
          className="opacity-0 bg-white flex flex-col justify-start pl-5 pr-2 z-50"
        >
          <LocationSearchPanel
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            setConfirmRidePanel={setConfirmRidePanel}
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      <div
        ref={vehicleRef}
        className="fixed  min-h-[35%] bottom-0 w-screen translate-y-full max-h-[50%] rounded-t-lg bg-white overflow-auto z-50"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          prices={prices}
          distance={distance}
          setSelectedPrice={setSelectedPrice}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>
      {/*Confirm ride panel below*/}

      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-screen translate-y-full  rounded-t-lg bg-white overflow-hidden z-50"
      >
        <ConfirmedRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleFound={vehicleFound}
          selectedPrice={selectedPrice}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
          createRide={createRide}
        />
      </div>

      {/*Looking for a driver*/}

      <div
        ref={vehicleFoundRef}
        className="fixed z-50 bottom-0 w-screen translate-y-full rounded-t-lg bg-white overflow-hidden"
      >
        <FindingDriver
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleFound={vehicleFound}
          selectedPrice={selectedPrice}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
        />
      </div>

      <div
        ref={driverSelectedRef}
        className="fixed z-50 bottom-0 w-screen translate-y-full rounded-t-lg bg-white overflow-hidden"
      >
        <DriverSelected ride={ride} />
      </div>
    </div>
  );
}

export default Home;
