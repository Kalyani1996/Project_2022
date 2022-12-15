import React from "react";
// Import Router Object Model to define Route Table
import { Router, Routes, Route } from "react-router-dom";
import CreateUser from "./createuser";
import EditUser from "./edituser";
import HomeComponent from "./home";
import NavBar from "./navbar";
import ViewProfile from "./viewprofile";
const MainRouterComponent = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/my-profile/:id" element={<ViewProfile />} />
      </Routes>
    </div>
  );
};

export default MainRouterComponent;
