import React, { useState } from "react";

const RegisterPage = () => {
  const [Inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    console.log(Inputs);
    const Register = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json", //until and unless content-type is sent data can't be sent to server
      },
      body: JSON.stringify(Inputs), // When sending data to a web server, the data has to be a string.
      // Convert a JavaScript object into a string with JSON.stringify().
    });
    const result = await Register.json();
    console.log(result);
  };
  return (
    <form
      action=""
      className="register"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        required
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
