import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/authentication" element={<LoginLayout></LoginLayout>}>
            <Route path="/authentication/login" element={<Login />}></Route>
            <Route path="/authentication/signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
