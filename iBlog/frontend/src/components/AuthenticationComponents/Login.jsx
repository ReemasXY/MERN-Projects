import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
const Login = () => {
  const [Inputs, setInputs] = useState({});
  const UserState = useContext(userContext);
  const { setusername } = UserState;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log("hello i am runnig");
    e.preventDefault();
    const Login = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json", //until and unless content-type is sent data can't be sent to server
      },
      credentials: "include",
      body: JSON.stringify(Inputs), // When sending data to a web server, the data has to be a string.
      // Convert a JavaScript object into a string with JSON.stringify().
    });
    const result = await Login.json();

    if (!result.error) {
      setusername(result.username);
      navigate("/");
    } else {
      alert("wrong credentials");
    }
  };

  return (
    <form action="" className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="Username"
        placeholder="Username"
        onChange={handleChange}
        minLength={4}
        name="username"
        required
      />
      <input
        type="Password"
        placeholder="Password"
        onChange={handleChange}
        required
        name="password"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
