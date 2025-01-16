import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogout = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const response = axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    localStorage.removeItem("token");
    // console.log("User Logged Out");
    Navigate("/login");
  }, [Navigate, response]);
  return <div>UserLogout</div>;
};

export default UserLogout;
