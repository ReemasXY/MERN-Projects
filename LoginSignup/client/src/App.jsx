import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Signup from "./components/Signup";
import ErrorModal from "./components/ErrorModal";
import { ToastState } from "./context/ToastContext";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const setLogin = (value) => {
    console.log("calling set log");
    setloggedIn(value);
  };
  return (
    <>
      <Router>
        <ToastState>
          <ErrorModal />

          <Routes>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar setLogin={setLogin} />
                  <Home loggedIn={loggedIn} />
                </>
              }
            ></Route>
          </Routes>
        </ToastState>
      </Router>
    </>
  );
}

export default App;
