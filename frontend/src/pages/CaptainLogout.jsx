import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainLogout = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const response = axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    localStorage.removeItem("token");
    // console.log("User Logged Out");
    Navigate("/captain-login");
  }, [Navigate, response]);
  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
