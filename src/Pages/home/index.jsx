import React, { useRef } from "react";
import "./home.css";
import Top from "./components/top.jsx";
import Carousel from "./components/carousel.jsx";
import Catalog from "./components/catalog.jsx";
import Categories from "./components/categories.jsx";

function Home() {
  return (
    <div className="home-page">
        <Top />
        <Carousel />
        <Categories />
        <Catalog/>
    </div>
  );
}

export default Home;
