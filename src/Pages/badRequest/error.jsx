import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

// Import the same icons used in the Navbar for consistency
import { AiFillHome } from "react-icons/ai";
import { MdOutlinePets } from "react-icons/md";

function NotFoundPage() {
  return (  
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <MdOutlinePets className="pet-icon" />
          <span className="error-code">404</span>
        </div>
        
        <h1>Página não encontrada!</h1>
        
        <p>
          Ops! Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link to="/home" className="home-button">
          <AiFillHome />
          <span>Voltar para o início</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
