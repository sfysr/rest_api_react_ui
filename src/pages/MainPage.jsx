import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainPage;