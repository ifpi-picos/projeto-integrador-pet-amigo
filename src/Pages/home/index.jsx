import React, { useRef } from "react";
import "./home.css";
import Top from "./components/top.jsx";
import Carousel from "./components/carousel.jsx";

function Home() {
  return (
    <div className="home-page">
        <Top />
        <Carousel />
    </div>
  );
}

export default Home;
