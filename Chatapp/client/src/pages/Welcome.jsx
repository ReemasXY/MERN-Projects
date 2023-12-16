import React from "react";

import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <>
      <div className="main flex items-center justify-center flex-col text-white h-full lg:w-full">
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
