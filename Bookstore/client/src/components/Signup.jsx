import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const Toast = useContext(ToastContext);
  // const { showToast } = Toast;
  const navigation = useNavigate();
  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [Error, setError] = useState({});
  // const [NoError, setNoError] = useState(true);
  let NoError = true;

  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const validation = () => {
    let error = {};
    console.log(inputs);
    if (!inputs.username) {
      error.username = "username is required";
    }
    if (inputs.email.indexOf("@") === -1) {
      error.email = "Please enter a valid email";
      if (!inputs.email) {
        error.email = "Email is required";
      }
    }
    if (inputs.password.length < 5) {
      error.password = "Password must be at least 5 charcters long";
      if (!inputs.password) {
        error.password = "Password is required";
      }
    }
    if (!(inputs.password === inputs.confirm)) {
      error.confirm = "Passwords do not match";
    }
    if (!(Object.entries(error).length === 0)) {
      console.log("false");
      NoError = false;
    } else {
      NoError = true;
    }
    setError(error);
  };
  const handleSubmit = async () => {
    const url = import.meta.env.VITE_HOST + "/user/signup";
    console.log(inputs);
    const createUser = fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(inputs), // body data type must match "Content-Type" header
    });
    const response = await createUser;
    const result = await response.json();
    console.log(result);
    if (result.success) {
      enqueueSnackbar("SignedIn Successfully!", {
        variant: "success",
      });
      // showToast("success", "Account Created Successfully");
      navigation("/authentication/login");
    } else {
      console.log(result.errors);
      enqueueSnackbar("SignedIn Failed!", {
        variant: "error",
      });
      // showToast("danger", result.errors);
    }
  };
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center w-100 "
        style={{ height: "100vh", backgroundColor: "  #4949FF" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation();
            if (NoError) {
              handleSubmit();
            }
          }}
          className="container-md  px-5 py-3 rounded-3 form "
        >
          <h3 className="text-center mb-3 tw-text-3xl tw-font-semibold">
            Signup
          </h3>
          <div className="form-floating mb-4 postion-relative">
            <input
              type="text"
              className="form-control shadow-none  border-0 border-bottom border-2 rounded-0  "
              id="floatingInput"
              placeholder="name@example.com"
              autoComplete="off"
              name="username"
              onChange={handleChange}
            />
            <label htmlFor="floatingInput my-2">Usename</label>
            {Error.username && (
              <div className="my-0 error">{Error.username}</div>
            )}
          </div>
          <div className="form-floating mb-4 postion-relative">
            <input
              type="text"
              className="form-control shadow-none  border-0 border-bottom border-2 rounded-0  "
              id="floatingInput"
              placeholder="name@example.com"
              autoComplete="off"
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="floatingInput my-2">Email address</label>
            {Error.email && <div className="my-0 error">{Error.email}</div>}
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              className="form-control shadow-none border-0 border-bottom border-2 rounded-0 "
              id="floatingPassword"
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword my-2">Password</label>
            {Error.password && (
              <div className="my-0 error">{Error.password}</div>
            )}
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              name="confirm"
              className="form-control shadow-none border-0 border-bottom border-2 rounded-0 "
              id="floatingPassword"
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword my-2"> Confirm Password</label>
            {Error.confirm && <div className="my-0 error">{Error.confirm}</div>}
          </div>
          <button className="btn btn-primary w-100 my-2">Sign Up</button>
          <div className="text-center my-2">
            Already have an account?{" "}
            <Link
              to="/authentication/login"
              className="underline text-blue-700"
            >
              Login
            </Link>
          </div>

          <div className="text-center d-flex justify-content-center position-relative border my-4">
            <p
              className="position-absolute px-2"
              style={{
                top: "-12px",
                zIndex: "100",
                backgroundColor: "white",
              }}
            >
              {" "}
              Or
            </p>
          </div>
          <div className="buttons d-flex flex-column gap-3">
            <button
              className="btn position-relative d-flex align-items-center justify-content-center"
              style={{ backgroundColor: " #1877F2", color: "white" }}
            >
              <i
                className="fa fa-facebook-f mx-3 position-absolute start-0 "
                style={{ fontSize: "1.3rem" }}
              ></i>
              Signup With Facebook
            </button>
            <button className="btn border text-secondary position-relative d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                className="position-absolute start-0 mx-2"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              SignUp With Google
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
