import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";

import Signup from "./components/Signup";
import ErrorModal from "./components/ErrorModal";
import { ToastState } from "./context/ToastContext";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addtask from "./components/Addtask";
import { ListState } from "./context/ListContext";
import Update from "./components/Update";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
          <Router>
      <ListState>
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
                    <Navbar />
                    <Home />
                  </>
                }
              ></Route>
              <Route
                exact
                path="/addtask"
                element={
                  <>
                    <Navbar />
                    <Addtask />
                  </>
                }
              ></Route>
              <Route
                exact
                path="/update"
                element={
                  <>
                    <Navbar />
                    <Update />
                  </>
                }
              ></Route>
            </Routes>
        </ToastState>
      </ListState>
          </Router>
    </>
  );
}

export default App;
