import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import FinishRide from "../../components/FinishRide";
import LiveTracking from "../../components/LiveTracking";
import { ToastContainer, toast } from "react-toastify";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = React.useState(false);
  const finishRidePanelRef = React.useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  // console.log(rideData);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          y: "0%",

          delay: 0.3,
          // transform: "translateY(0%)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          y: "100%",
          display: "hidden",
          // transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div>
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
        <div
          ref={finishRidePanelRef}
          className="bg-white absolute bottom-0 w-screen h-full z-40 rounded-t-lg overflow-y-auto overflow-x-hidden "
        >
          <FinishRide setFinishRidePanel={setFinishRidePanel} ride={rideData} />
        </div>
        <div
          style={{
            background: "linear-gradient(to right, #f2994a, #f2c94c)",
          }}
          className="bg-white absolute bottom-0 w-screen  rounded-t-lg overflow-y-auto overflow-x-hidden z-30"
        >
          <div className="flex flex-col justify-center items-center my-[8%]">
            <div className="w-[100%] flex flex-row px-2">
              <h2 className="w-[50%] flex justify-start text-2xl font-semibold font-sans pl-[15px] p-2">
                4KM Away
              </h2>
              <div className="w-[50%] flex justify-center items-center">
                <button
                  onClick={() => {
                    // notify();
                    setFinishRidePanel(true);
                  }}
                  style={{
                    background: "linear-gradient(to right, #1d976c, #93f9b9)",
                  }}
                  className="px-7 py-3 flex justify-center rounded-lg text-white font-semibold text-lg"
                >
                  Complete Ride
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CaptainRiding;
