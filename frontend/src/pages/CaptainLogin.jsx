import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { ToastContainer, toast } from "react-toastify";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const notify = (message, success = false) => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "w-5/6 mt-6 text-center",
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "w-5/6 mt-6 text-center",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const captain = { email: email, password: password };
      //console.log("Sending login request:", captain);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captain
      );

      //console.log("Login response:", response.data);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        // updateCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login error:", error);
      notify("Login failed, invalid email or password", false);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <div className="ml-6 pt-5 pb-2.5">
          <Link to="/">
            <img
              className="w-12"
              src="https://pngimg.com/uploads/uber/uber_PNG13.png"
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
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="bg-black text-white font-semibold mb-5 rounded-lg px-4 py-3 border w-full text-lg mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="text-center">
              Not a Captain?{" "}
              <Link to="/captain-signup" className="text-blue-600">
                Become a Captain now.
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="/login"
          className="flex justify-center items-center bg-green-600 text-white font-semibold mb-7 rounded-lg px-4 py-3 border w-full text-lg mx-7 "
        >
          Sign in as User
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CaptainLogin;
