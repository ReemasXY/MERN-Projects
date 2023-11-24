import { useSnackbar } from "notistack";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setLogin }) => {
  const [user, setuser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (async () => {
      console.log(import.meta.env.VITE_HOST + "/user/info");
      const response = await fetch(import.meta.env.VITE_HOST + "/user/info", {
        credentials: "include",
      });
      const result = await response.json();

      if (!result.errors) {
        setuser(result);
        setLogin(result);
      } else {
        console.log(result.errors);
      }
    })();
  }, []);
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_HOST + "/user/logout", {
      credentials: "include",
    });
    const result = await response.json();
    if (!result.errors) {
      // showToast("success", "Logged-Out Successfully");
      enqueueSnackbar("Loggedout Successfully!", {
        variant: "success",
      });
      setuser(null);
      setLogin(false);
    } else {
      enqueueSnackbar("LoggingOut Failed!", {
        variant: "error",
      });
      console.log("error seen");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="d-flex">
            {user ? (
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/authentication/login"}
                  className="btn btn-outline-success mx-2"
                >
                  Login
                </Link>
                <Link
                  to={"/authentication/signup"}
                  className="btn btn-outline-success"
                >
                  Signup
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
