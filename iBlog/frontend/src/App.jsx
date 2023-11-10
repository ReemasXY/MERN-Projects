import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Post from "./components/Pages/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/AuthenticationComponents/Login";
import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
import RegisterPage from "./components/AuthenticationComponents/RegisterPage";
function App() {
  return (
    <>
      <main className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                //  index === "/" same thing
                element={
                  <>
                    <IndexPage />
                  </>
                }
              ></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/Register" element={<RegisterPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
