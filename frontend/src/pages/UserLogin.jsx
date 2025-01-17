import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { user: userData, token } = response.data;
        // Make sure all required fields are present
        if (userData && userData.email) {
          setUser(userData); // This will trigger the context update
          localStorage.setItem("token", token);
          navigate("/home");
        } else {
          console.error("Invalid user data received from API");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <div className="ml-7 py-7">
          <Link to="/">
            <img
              className="w-16"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
              alt="logo"
            />
          </Link>
        </div>

        <div className="px-6 pt-6">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-xl mb-2 font-semibold">What's your email</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#ededed] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base font-semibold placeholder:ml-2"
              required
              type="email"
              placeholder="your_email@here.com"
            />
            <h3 className="text-xl mb-2 font-semibold">Enter Password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#ededed] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base font-semibold placeholder:ml-2"
              type="password"
              required
              placeholder="yourPassword"
            />
            <button className="bg-black text-white font-semibold mb-5 rounded-lg px-4 py-3 border w-full text-lg mt-2">
              Login
            </button>
            <p className="text-center">
              New here?{" "}
              <Link to="/signup" className="text-blue-600">
                create an account now.
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="/captain-login"
          className="flex justify-center items-center bg-blue-600 text-white font-semibold mb-7 rounded-lg px-4 py-3 border w-full text-lg mx-7 "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
