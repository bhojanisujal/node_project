import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./SassStyale.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Singupform from "./pages/Singupform";
import Email from "./pages/Email";
import OTPCODE from "./pages/OTPCODE";
import Forgotpassword from "./pages/Forgotpassword";

import Analytics from "./pages/Analytics";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
// import Test from "./pages/test";
import Changepassword from "./pages/Changepassword";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Content from "./pages/Content";
import Review from "./pages/Review";
import Media from "./pages/Media";
import Order from "./pages/order";
// import sound from "./sound/sample_soft_alert02_kofi_by_miraclei-360125.mp3";

function App() {
  //  new Audio(sound).play();
  return (
    <>
      <div className="bg-transparent" >
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/Products" element={<Product/>} />
          <Route path="/Content" element={<Content/>} />
          <Route path="/Review" element={<Review/>} />
          <Route path="/Media" element={<Media/>} />
          <Route path="/Order" element={<Order/>} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Singupform" element={<Singupform />} />
          <Route path="/Email" element={<Email />} />
          <Route path="/OTPCODE" element={<OTPCODE />} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/Changepassword" element={<Changepassword />} />
        </Routes>

        {/* < Test/> */}
      </div>
    </>
  );
}

export default App;
