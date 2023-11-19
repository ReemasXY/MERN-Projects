import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

const Navbar = () => {
  const UserState = useContext(userContext);
  const { username, setusername } = UserState;
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/profile", {
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (result.username) setusername(result.username);
    })();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      credentials: "include",
    });
    setusername(null);
  };
  return (
    <nav>
      <div className="logo">
        <Link to="/" className="logo">
          MyBlog
        </Link>
      </div>
      <div className="navItems">
        {username ? (
          <>
            <Link to="/create">Create a post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
