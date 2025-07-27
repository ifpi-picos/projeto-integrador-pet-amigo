import React, { useState } from "react"; // 1. Importe o useState
import "./profile.css";

import ProfileData from "./components/profileData.jsx";
// 2. Importe os componentes que serão exibidos no grid
import Gallery from "./components/gallery.jsx";
import Pets from "./components/pets.jsx";
import Adoptions from "./components/adoptions.jsx";
import Likes from "./components/likes.jsx";
// Importe os outros...

function Profile() { // Convenção: Nomes de componentes com letra maiúscula
    // 3. Crie o estado para controlar a aba ativa. 'galeria' é o valor inicial.
    const [activeTab, setActiveTab] = useState('galeria');

    // 4. Função para renderizar o componente correto com base na aba ativa
    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'galeria':
                return <Gallery />;
            case 'pets':
                return <Pets />;
            case 'adocao':
                return <Adoptions />;
            case 'curtidas':
                return <Likes />;
            default:
                return <Gallery />;
        }
    };

    return (
        <div className="profile-container">
            <ProfileData />
            <section className="profile-section">
                <nav className="profile-nav">
                    <ul>
                        {/* 5. Itens da navegação agora são clicáveis e mudam o estado */}
                        <li 
                            className={activeTab === 'galeria' ? 'active' : ''}
                            onClick={() => setActiveTab('galeria')}
                        >
                            Galeria
                        </li>
                        <li 
                            className={activeTab === 'pets' ? 'active' : ''}
                            onClick={() => setActiveTab('pets')}
                        >
                            Pets
                        </li>
                        <li 
                            className={activeTab === 'adocao' ? 'active' : ''}
                            onClick={() => setActiveTab('adocao')}
                        >
                            Adoção
                        </li>
                        <li 
                            className={activeTab === 'curtidas' ? 'active' : ''}
                            onClick={() => setActiveTab('curtidas')}
                        >
                            Curtidas
                        </li>
                    </ul>
                </nav>
                <div className="profile-grid">
                    {/* 6. O componente ativo é renderizado aqui */}
                    {renderActiveComponent()}
                </div>
            </section>
        </div>
    );
}

export default Profile;