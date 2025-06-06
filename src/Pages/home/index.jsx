import React, { useRef } from "react";
import "./home.css";
import NavBar from "../../Components/NavBar/navbar.jsx";
import Top from "./components/top.jsx";

function Home() {
  return (
    <div className="home-page">
      <NavBar />
      <section className="home-content">
        <Top />
      </section>
    </div>
  );
}

export default Home;
