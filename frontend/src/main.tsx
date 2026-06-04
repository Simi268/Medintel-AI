
import React from "react";

import ReactDOM from "react-dom/client";

import {

  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

import "./index.css";
import App from "./App";

import Login from "./pages/Login";
import Signup from "./pages/Signup";


// =================================================
// APP ROUTER
// =================================================

function Root() {

  const token =
    localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route

          path="/"

          element={
            token
              ? <App />
              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}
        />

        {/* SIGNUP */}

        <Route

          path="/signup"

          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>
  );
}


// =================================================
// RENDER
// =================================================

ReactDOM.createRoot(

  document.getElementById("root")!

).render(

  <React.StrictMode>

    <Root />

  </React.StrictMode>
);
