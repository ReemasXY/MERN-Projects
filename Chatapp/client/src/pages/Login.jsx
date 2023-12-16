import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const { data } = await axios.post(loginRoute, Inputs);
        console.log(data);
        if (data.errors) {
          toast.error(data.errors);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal Server error");
      }
    }
  };
  const validation = () => {
    if (Object.keys(Inputs).length !== 2) {
      toast.error("Please enter all the fields");
      return false;
    } else if (Inputs.username.length < 5) {
      toast.error("Username should be at least 5 characters long");
      return false;
    } else if (Inputs.password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="img">
            <h1>Chat Ninja</h1>
            <img src={Logo} alt="" />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
          <div className="login">
            <span>Don't have an account ?</span>
            <Link to={"/register"} className="link">
              Register
            </Link>
          </div>
        </form>
      </FormContainer>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
        pauseOnHover={true}
      />
    </>
  );
};
const FormContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    width: 70%;
    padding: 20px 40px;
    background-color: #00000076;
    max-width: 450px;
    border-radius: 2rem;
  }
  input,
  button {
    padding: 15px 20px;
    border-radius: 5px;
    border: 0;
    outline: none;
    background: transparent;
    border: 1px solid #4e0eff;
    color: white;
  }

  button {
    cursor: pointer;
    color: white;
    background-color: #997af0;
    transition: 0.3s background-color ease-in-out;
    font-size: 0.9rem;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .img {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
  }
  img {
    height: 4rem;
  }
  h1 {
    font-size: 2.3rem;
    color: white;
  }
  .login {
    display: flex;
    gap: 5px;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .login span {
    color: white;
  }
  .login .link {
    color: #4e0eff;
  }
  @media screen and (max-width: 550px) {
    form {
      width: 100%;
      height: 100%;
      max-width: unset;
      border-radius: unset;
    }
  }
`; //its just makes a div and thats it
export default Login;
