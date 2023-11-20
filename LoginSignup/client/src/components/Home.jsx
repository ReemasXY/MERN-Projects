import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [username, setusername] = useState("");

  console.log(props.loggedIn);
  return (
    <>
      <div
        className="container-fluid py-4 text-white  bg-dark"
        style={{ height: "100vh" }}
      >
        <div className="container">
          {props.loggedIn ? (
            <h2>{props.loggedIn.username}</h2>
          ) : (
            <h2> not logged in</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
