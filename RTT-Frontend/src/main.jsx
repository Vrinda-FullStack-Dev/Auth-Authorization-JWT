//import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
// import Home from "./components/Home";
// import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import GoogleRedirectHandler from "./components/GoogleRedirectHandler";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        {/* <Route path="" element={<Home />} />
        <Route path="about" element={<About />} /> */}
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="dashboard" element={<Dashboard />} /> {/* Add Dashboard Route */}
      </Route>
      <Route path="/google-redirect" element={<GoogleRedirectHandler/>} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
