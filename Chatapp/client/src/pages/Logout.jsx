import React from "react";

import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <>
      <button className="p-2 bg-[#9a86f3] border rounded-lg">
        <BiPowerOff
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="text-white text-2xl"
        />
      </button>
    </>
  );
};

export default Logout;
