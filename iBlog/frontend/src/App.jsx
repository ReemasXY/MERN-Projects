import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Post from "./components/Pages/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/AuthenticationComponents/Login";
import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
import RegisterPage from "./components/AuthenticationComponents/RegisterPage";
import { UserState } from "./context/UserContext";
import CreatePost from "./components/Pages/CreatePost";
import SinglePost from "./components/Pages/SinglePost";
import EditPost from "./components/Pages/EditPost";
function App() {
  return (
    <>
      <main className="container">
        <BrowserRouter>
          <UserState>
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
                <Route path="/create" element={<CreatePost />}></Route>
                <Route path="/post/:id" element={<SinglePost />}></Route>
                <Route path="/edit/:id" element={<EditPost />}></Route>
              </Route>
            </Routes>
          </UserState>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
