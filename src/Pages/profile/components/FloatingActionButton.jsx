import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCamera, FaDog } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

function FloatingActionButton({ isOwnProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCadastroAnimal = () => {
    navigate("/cadastro-animal");
  };

  if (!isOwnProfile) {
    return null;
  }

  return (
    <div className="fab-container">
      {/* Wrapper para posicionamento */}
      <div className="fab-wrapper">
        <div className={`fab-actions ${isOpen ? "open" : ""}`}>
          <button className="fab-action-btn">
            <FaCamera />
          </button>
          <button className="fab-action-btn">
            <FaDog />
          </button>
          <button className="fab-action-btn" onClick={handleCadastroAnimal}>
            <MdOutlinePets />
          </button>
        </div>
        {/* Adicionada a classe 'open' para a animação do ícone */}
        <button
          className={`fab-main ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {/* A animação agora é feita no CSS, não precisamos mais trocar o ícone */}
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default FloatingActionButton;
