import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active state
import "./navbar.css"; // Use the new CSS file name

// Import icons
import { TbSettingsFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
// import { BsMoonStarsFill } from "react-icons/bs"; // Theme toggle removed for now
import { LuLogOut } from "react-icons/lu";

// Removed all vanilla JS DOM manipulation (showSidebar, linkColor, theme logic)

function Navbar() {
  // Active link class handling using NavLink
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "sidebar__link active-link" : "sidebar__link";
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    // Removed id="sidebar"
    <nav className="sidebar">
      {/* Removed outer div wrapper if not needed for structure */}
      <div className="sidebar__container">
        <div className="sidebar__user">
          <div className="sidebar__img">
            {/* Consider making the image source dynamic */} 
            <img src="https://pbs.twimg.com/media/EaURUzNU0AIRi4t.jpg" alt="User Avatar" />
          </div>
          <div className="sidebar__info">
            {/* Consider making user info dynamic */} 
            <h3>Antonio Enzo Bezerra</h3>
            <span>antonioenzobezerra789@gmail.com</span>
          </div>
        </div>

        <div className="sidebar__content">
          {/* Section 1: Main Options */}
          <div>
            <h3 className="sidebar__title">Opções</h3>
            <div className="sidebar__list">
              <NavLink className={getNavLinkClass} to="/home">
                <GoHomeFill />
                <span>Início</span>
              </NavLink>

              <NavLink className={getNavLinkClass} to="/feed"> {/* Changed path for example */} 
                <HiVideoCamera />
                <span>Feed</span>
              </NavLink>

              <NavLink className={getNavLinkClass} to="/community"> {/* Changed path for example */} 
                <IoChatbubbleEllipses />
                <span>Comunidade</span>
              </NavLink>

              <NavLink className={getNavLinkClass} to="/profile"> {/* Changed path for example */} 
                <FaUser />
                <span>Perfil</span>
              </NavLink>

              {/* Removed duplicate Configurações link from Opções */}
            </div>
          </div>

          {/* Section 2: Settings */}
          <div>
            <h3 className="sidebar__title">Ajustes</h3>
            <div className="sidebar__list">
              <NavLink className={getNavLinkClass} to="/settings"> {/* Changed path for example */} 
                <TbSettingsFilled />
                <span>Configurações</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Actions at the bottom */}
        <div className="sidebar__actions">
          {/* Theme toggle button removed - implement with React state if needed 
          <button className="sidebar__link"> 
            <BsMoonStarsFill />
            <span>Modo Noturno</span>
          </button>
          */}
          <button className="sidebar__link logout-button" onClick={handleLogout}>
            <LuLogOut />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

