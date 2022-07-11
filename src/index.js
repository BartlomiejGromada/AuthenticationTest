import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContextProvider from "./context/UserContext";
import Login from "./pages/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <div>PROTECTED!!!</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
