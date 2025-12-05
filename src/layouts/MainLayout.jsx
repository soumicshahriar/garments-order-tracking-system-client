import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
