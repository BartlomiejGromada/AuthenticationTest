import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UserContextProvider from "./context/UserContext";
import "./input.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {/* PrivateRoutes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          {/* PublicRoutes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
