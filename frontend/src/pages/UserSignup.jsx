import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";

const UserSignup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const notify = () =>
    toast.success(`Registered, Redirecting to Login`, {
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
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    console.log(newUser);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    if (response.status === 201) {
      const data = response.data;
      setUserData(data.user);
      setUser(data.user);
      notify();
      await timeout(5000);
      navigate("/login");
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
            <h3 className="text-base mb-2 font-semibold">
              What should we call you?
            </h3>
            <div className="flex gap-3 mb-5">
              <input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#ededed] rounded-lg px-4 py-2 border text-lg placeholder:text-base font-semibold placeholder:ml-2 w-1/2"
                required
                type="text"
                placeholder="First name"
              />
              <input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#ededed] rounded-lg px-4 py-2 border text-lg placeholder:text-base font-semibold placeholder:ml-2 w-1/2"
                required
                type="text"
                placeholder="Last name"
              />
            </div>

            <h3 className="text-base mb-2 font-semibold">What's your email</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#ededed] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base font-semibold placeholder:ml-2"
              required
              type="email"
              placeholder="your_email@here.com"
            />
            <h3 className="text-base mb-2 font-semibold">Enter Password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#ededed] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base font-semibold placeholder:ml-2"
              type="password"
              required
              placeholder="yourPassword"
            />
            <button className="bg-black text-white font-semibold mb-5 rounded-lg px-4 py-3 border w-full text-lg mt-2">
              Create Account
            </button>
            <p className="text-center">
              Already a user?{" "}
              <Link to="/login" className="text-blue-600">
                Login here.
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center p-4 bg-gray-100">
        <p className="text-center text-[11px] text-gray-600">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy. Your information is safe with us and will not be shared
          without your consent.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSignup;
