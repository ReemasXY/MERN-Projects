import React from "react";
import Navbar from "./Navbar";
import CreateBook from "./CreateBook";
const Home = (props) => {
  return (
    <>
      <Navbar setLogin={props.setLogin} />
      <CreateBook />
    </>
  );
};

export default Home;
