import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./error.css"; // Certifique-se de importar o CSS

// Importe os ícones
import { AiFillHome } from "react-icons/ai";
import { MdOutlinePets } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navega uma página para trás no histórico
    };

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
                
                {/* Grupo de botões com as duas opções de navegação */}
                <div className="not-found-actions">
                    <button onClick={handleGoBack} className="back-button">
                        <FaArrowLeft />
                        <span>Voltar</span>
                    </button>
                    {/* Botão para a Home reintroduzido para melhor UX */}
                    <Link to="/home" className="home-button">
                        <AiFillHome />
                        <span>Ir para o Início</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;