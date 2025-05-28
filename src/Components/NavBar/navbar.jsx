import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.jpg";

function Navbar() {
    return (
        <nav>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <h1>PetAmigo</h1>   
            </div>
            <ul>
                <li></li>
            </ul>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar;