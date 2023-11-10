import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/" className="logo">
          MyBlog
        </Link>
      </div>
      <div className="navItems">
        <Link to="/login">Login</Link>
        <Link to="/Register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
