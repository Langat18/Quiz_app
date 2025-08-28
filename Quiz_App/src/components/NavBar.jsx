import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (err) {
    navigate = null;
  }

  const goHome = () => {
    if (navigate) navigate("/");
    else window.location.href = "/";
  };

  return (
    <header className="w-full flex items-center px-8 py-4 bg-gray-900 bg-opacity-70 rounded-full shadow-lg mt-4 mx-4">
      <img
        src={logo}
        alt="App Logo"
        className="h-12 w-12 rounded-full object-cover shadow-lg cursor-pointer hover:bg-gray-800 hover:scale-105 transition-all duration-300"
        onClick={goHome}
      />
    </header>
  );
};

export default Navbar;