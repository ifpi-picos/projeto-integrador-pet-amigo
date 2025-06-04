import React, { useRef } from "react";
import "./home.css";
import NavBar from "../../Components/NavBar/navbar.jsx";
import { FaRegUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

function Home() {
  return (
    <div className="home-page">
      <NavBar />
    </div>
  );
}

export default Home;
