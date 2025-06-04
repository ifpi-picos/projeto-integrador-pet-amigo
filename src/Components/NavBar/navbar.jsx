import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

// Import icons
import { TbSettingsFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import logo from "../../assets/logo.jpg"; 

function Navbar() {
    return (
        <nav className="sidebar">
            <ul>
                <li className="sidebar-item-logo">
                    <Link to="/home" className="sidebar-logo">
                        <span className="sidebar-icon">
                            <img src={logo} alt="Pet amigo logo" />
                        </span>
                        <h3>Pet Amigo</h3>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/home">
                        <span className="sidebar-icon">
                            <GoHomeFill />
                        </span>
                        <span className="sidebar-text">Home</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/video">
                        <span className="sidebar-icon">
                            <HiVideoCamera />
                        </span>
                        <span className="sidebar-text">Video</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/chat">
                        <span className="sidebar-icon">
                            <IoChatbubbleEllipses />
                        </span>
                        <span className="sidebar-text">Chat</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/profile">
                        <span className="sidebar-icon">
                            <FaUser />
                        </span>
                        <span className="sidebar-text">Profile</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/settings">
                        <span className="sidebar-icon">
                            <TbSettingsFilled />
                        </span>
                        <span className="sidebar-text">Settings</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/logout">
                        <span className="sidebar-icon">
                            <LuLogOut />
                        </span>
                        <span className="sidebar-text">Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
