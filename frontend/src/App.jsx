import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import RideStarted from "./pages/RideStarted";
import CaptainRiding from "./pages/CaptainRiding";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Check initially
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const DesktopMessage = () => (
    <div
      className="text-2xl font-semibold font-sans text-white flex flex-col justify-center items-center"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        background: "linear-gradient(to right, #00c6ff, #0072ff)",
      }}
    >
      <img
        className="w-[10%] p-2.5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
        alt="logo"
      />
      <h1>
        Please switch to mobile viewing mode using developer tools or open on a
        mobile device.
        <br />
        This website is designed for mobile devices only.
      </h1>
      <a
        href="https://github.com/K-Daksh/UberClone"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-thin hover:underline"
      >
        https://github.com/K-Daksh/UberClone
      </a>
    </div>
  );

  return isMobileView ? (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/riding" element={<RideStarted />} />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user-logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        ></Route>
        <Route path="/captain-riding" element={<CaptainRiding />}></Route>
        <Route
          path="/captain-logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  ) : (
    <DesktopMessage />
  );
};

export default App;
