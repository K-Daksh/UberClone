import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../../components/CaptainDetails";
import RidePopup from "../../components/RidePopup";
import ConfirmRidePickup from "../../components/ConfirmRidePickup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../../components/LiveTracking";

const CaptainHome = () => {
  const ridePopupRef = React.useRef(null);
  const confirmRidePickupRef = React.useRef(null);
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const { socket } = React.useContext(SocketContext);
  const [ridePopup, setRidePopup] = React.useState(false);
  const [ride, setRide] = useState(null);
  const [confirmRidePickup, setConfirmRidePickup] = React.useState(false);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    // return () => clearInterval(locationInterval)
  }, []);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position.coords.latitude, position.coords.longitude);
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain]);
  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopup(true);
  });

  async function confirmRide() {
    // console.log("Confirming ride");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response);
    setRidePopup(false);
    setConfirmRidePickup(true);
  }

  useGSAP(
    function () {
      if (ridePopup) {
        gsap.to(ridePopupRef.current, {
          y: "0%",
          delay: 0.3,
        });
      } else {
        gsap.to(ridePopupRef.current, {
          y: "100%",
        });
      }
    },
    [ridePopup]
  );

  useGSAP(
    function () {
      if (confirmRidePickup) {
        gsap.to(confirmRidePickupRef.current, {
          y: "0%",
          delay: 0.3,
        });
      } else {
        gsap.to(confirmRidePickupRef.current, {
          y: "100%",
        });
      }
    },
    [confirmRidePickup]
  );

  // if (!captain) {
  //   console.log("called");
  //   fetchProfile();
  // }

  return (
    <div className="overflow-hidden h-screen w-screen">
      <div className="absolute top-0 left-0 ml-7 py-7 z-30">
        <Link
        // onClick={async () => {
        //   console.log("Trying logout");
        //   await axios.get(`${import.meta.env.VITE_API_URL}/captain-logout`);
        // }}
        // to="/captain-login"
        >
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
            alt="logo"
          />
        </Link>
      </div>
      <Link
        to="/captain-logout"
        className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black flex items-center justify-center z-30"
      >
        <i
          style={{ color: "white" }}
          className="ri-logout-box-line ri-xl mb mr-0.5"
        ></i>
      </Link>

      <div className="absolute w-screen h-[100%] top-0 z-20">
        <LiveTracking />
      </div>
      <div className="bg-white absolute bottom-0 w-screen rounded-t-lg overflow-y-auto overflow-x-hidden z-50">
        <div className="">
          {/* new comp time
           */}
          <CaptainDetails />
        </div>
        <div
          ref={ridePopupRef}
          className="fixed z-10 bottom-0 w-screen rounded-t-lg bg-white overflow-scroll"
        >
          <RidePopup
            setConfirmRidePickup={setConfirmRidePickup}
            setRidePopup={setRidePopup}
            ride={ride}
            confirmRide={confirmRide}
          />
        </div>
        <div
          ref={confirmRidePickupRef}
          className="fixed z-10 bottom-0 w-screen h-screen rounded-t-lg bg-white overflow-scroll"
        >
          <ConfirmRidePickup
            setConfirmRidePickup={setConfirmRidePickup}
            setRidePopup={setRidePopup}
            ride={ride}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
