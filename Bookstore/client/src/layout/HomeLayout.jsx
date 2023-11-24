import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = (props) => {
  return (
    <>
      <Navbar setLogin={props.setLogin} />
      <Outlet />
    </>
  );
};

export default HomeLayout;
