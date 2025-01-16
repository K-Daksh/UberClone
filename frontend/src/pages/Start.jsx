import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div>
      <div>
        <div className="h-screen pt-7 w-full flex justify-between flex-col bg-blue-600">
          <img
            className="w-16 ml-7"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
            alt="logo"
          />
          <img
            src="https://dropinblog.net/34254033/files/featured/Storyboard_Images/City_driver-rafiki.png"
            alt="banner"
          />
          <div className="bg-white py-9 link-5 pb-10 text-center rounded-t-lg">
            <h2 className="text-3xl font-semibold">Get started with UBER</h2>
            <Link
              to="/login"
              className="flex items-center justify-center w-100 ml-5 mr-5 bg-black text-white py-3 rounded-lg mt-5
              text-xl"
            >
              {" "}
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
