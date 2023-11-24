import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./layout/LoginLayout";
import CreateBook from "./components/CreateBook";

import "./App.css";
import HomeLayout from "./layout/HomeLayout";
import BookInfo from "./components/BookInfo";
import Editbook from "./components/Editbook";
import { SnackbarProvider } from "notistack";

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
        <SnackbarProvider autoHideDuration={1500} style={{ zIndex: -100 }}>
          <Routes>
            <Route path="/authentication" element={<LoginLayout></LoginLayout>}>
              <Route path="/authentication/login" element={<Login />}></Route>
              <Route path="/authentication/signup" element={<Signup />}></Route>
            </Route>
            <Route path="/" element={<HomeLayout setLogin={setLogin} />}>
              <Route path="/" element={<Home loggedIn={loggedIn} />}></Route>
              <Route path="/createbook" element={<CreateBook />}></Route>
              <Route path="/books/details/:id" element={<BookInfo />}></Route>
              <Route path="/books/edit/:id" element={<Editbook />}></Route>
            </Route>
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
