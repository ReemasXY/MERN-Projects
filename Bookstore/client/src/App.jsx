import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setloggedIn] = useState(false);
  const setLogin = (value) => {
    console.log("calling set log");
    setloggedIn(value);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/authentication" element={<LoginLayout></LoginLayout>}>
            <Route path="/authentication/login" element={<Login />}></Route>
            <Route path="/authentication/signup" element={<Signup />}></Route>
          </Route>
          <Route path="/" element={<Home setLogin={setLogin} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
