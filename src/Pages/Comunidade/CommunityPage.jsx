import React from 'react';
import './CommunityPage.css';

// Ícones
import { FaWhatsapp, FaUsers } from 'react-icons/fa';
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

// Imagem de destaque (a mesma de antes)
import communityImage from '@/assets/community.jpeg';

function CommunityPage() {
    // IMPORTANTE: Substitua pelo seu link de convite real!
    const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/GgnFmbb4KjY5orZXWqpDit?mode=wwt';

    return (
        <div className="community-page-container">
            {/* --- Coluna da Imagem (Esquerda) --- */}
            <div className="community-image-column">
                <img src={communityImage} alt="Animais felizes com seus donos" />
            </div>

            {/* --- Coluna do Conteúdo (Direita) --- */}
            <div className="community-content-column">
                <header className="community-header">
                    <h1>Junte-se à Nossa Comunidade!</h1>
                    <p>Faça parte do coração do Pet Amigo no WhatsApp e fique por dentro de tudo em tempo real, diretamente no seu celular.</p>
                </header>

                <ul className="benefits-list">
                    <li>
                        <IoNotificationsCircleSharp className="benefit-icon" />
                        <div className="benefit-text">
                            <strong>Alertas Imediatos</strong>
                            <span>Receba notificações de animais desaparecidos na sua área.</span>
                        </div>
                    </li>
                    <li>
                        <FaHeart className="benefit-icon" />
                        <div className="benefit-text">
                            <strong>Novos Pets para Adoção</strong>
                            <span>Veja em primeira mão os novos animais que buscam um lar.</span>
                        </div>
                    </li>
                    <li>
                        <FaUsers className="benefit-icon" />
                        <div className="benefit-text">
                            <strong>Dicas e Apoio</strong>
                            <span>Troque experiências, dicas de cuidados e histórias com outros amantes de pets.</span>
                        </div>
                    </li>
                </ul>

                <a 
                    href={WHATSAPP_COMMUNITY_LINK} 
                    className="cta-button" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp />
                    Entrar na Comunidade Agora
                </a>
            </div>
        </div>
    );
}

export default CommunityPage;