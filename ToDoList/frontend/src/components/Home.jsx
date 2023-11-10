import React, { useEffect, useState } from "react";
import List from "./List";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    }
  });
  const [username, setusername] = useState("");
  const changeUsername = (name) => {
    setusername(name);
  };
  return (
    <>
      <div
        className="container-fluid py-4 text-white  bg-dark"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <h2>Hello {username}</h2>
          <h3 className="mt-4">All of your tasks</h3>
          <List changeUsername={changeUsername} />
        </div>
      </div>
    </>
  );
};

export default Home;
