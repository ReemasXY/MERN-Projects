import React from "react";

import Robot from "../assets/robot.gif";
import Logout from "./Logout";
const Welcome = ({ currentUser }) => {
  return (
    <>
      <div className="main flex items-center justify-center flex-col text-white h-full lg:w-full relative bg-[#131324]">
        <div className="logo absolute right-3 top-5">
          <Logout />
        </div>
        <img src={Robot} alt="" className="h-[15rem] -mt-16" />
        <h1 className="-mt-16 font-bold mb-2">
          Welcome{" "}
          <span className="capitalize text-[#4e00ff]">
            {currentUser.username}!
          </span>
        </h1>
        <h3>Please select a chat to start messaging</h3>
      </div>
    </>
  );
};

export default Welcome;
