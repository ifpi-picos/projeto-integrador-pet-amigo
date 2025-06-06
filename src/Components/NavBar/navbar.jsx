import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { TbSettingsFilled, TbMoonFilled, TbSunFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import logo from "../../assets/logo.jpg";

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs === 'dark';
        }
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return true;
        }
    }
    return false;
};

function Navbar() {
    const location = useLocation();
    const [isNightMode, setIsNightMode] = useState(getInitialTheme);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        if (isNightMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            window.localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            window.localStorage.setItem('theme', 'light');
        }
    }, [isNightMode]);

    const toggleNightMode = () => {
        setIsNightMode(prevMode => !prevMode);
    };

    return (
        <nav className="sidebar">
            <ul>
                <li className=" sidebar-item-logo">
                    <Link to="/home" className="sidebar-logo">
                        <span className="sidebar-icon">
                            <img src={logo} alt="Pet amigo logo" />
                        </span>
                        <h3 className="sidebar-text-logo">Pet Amigo</h3>
                    </Link>
                </li>

                <li className={`sidebar-item ${isActive("/home") ? "active" : ""}`}>
                    <Link to="/home">
                        <span className="sidebar-icon">
                            <GoHomeFill />
                        </span>
                        <span className="sidebar-text">Início</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${isActive("/video") ? "active" : ""}`}>
                    <Link to="/video">
                        <span className="sidebar-icon">
                            <HiVideoCamera />
                        </span>
                        <span className="sidebar-text">Feed</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${isActive("/chat") ? "active" : ""}`}>
                    <Link to="/chat">
                        <span className="sidebar-icon">
                            <IoChatbubbleEllipses />
                        </span>
                        <span className="sidebar-text">Comunidade</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${isActive("/profile") ? "active" : ""}`}>
                    <Link to="/profile">
                        <span className="sidebar-icon">
                            <FaUser />
                        </span>
                        <span className="sidebar-text">Perfil</span>
                    </Link>
                </li>

                <li className={`sidebar-item sidebar-item-push-to-bottom ${isActive("/settings") ? "active" : ""}`}>
                    <Link to="/settings">
                        <span className="sidebar-icon">
                            <TbSettingsFilled />
                        </span>
                        <span className="sidebar-text">Settings</span>
                    </Link>
                </li>
                {/* AJUSTE: Adicionado onClick ao li para mobile e stopPropagation no label */ }
                <li className="sidebar-item night-mode-item" onClick={toggleNightMode}>
                    <span className="sidebar-icon">
                        {isNightMode ? <TbSunFilled /> : <TbMoonFilled />}
                    </span>
                    <span className="sidebar-text">Modo Noturno</span>
                    <label className="switch" onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={isNightMode} onChange={toggleNightMode} />
                        <span className="slider"></span>
                    </label>
                </li>
                <li className={`sidebar-item ${isActive("/login") ? "active" : ""}`}>
                    <Link to="/login">
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