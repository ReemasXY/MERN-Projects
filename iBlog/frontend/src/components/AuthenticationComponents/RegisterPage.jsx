import React, { useState } from "react";

const RegisterPage = () => {
  const [Inputs, setInputs] = useState({ username: "", password: "" });
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

    if (Register.status === 200) {
      console.log(result);
    } else {
      console.log("Registration failed", result.error);
    }
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
        value={Inputs.username}
        minLength={4}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={Inputs.password}
        required
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
