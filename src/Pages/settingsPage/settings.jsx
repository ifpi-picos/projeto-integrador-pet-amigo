import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./settings.css";
import { supabase } from "../../supabaseClient";

// Ícones
import { 
    IoSettingsOutline, 
    IoShieldCheckmarkOutline, 
    IoNotificationsOutline, 
    IoPersonOutline 
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";

// Componentes de conteúdo das seções
import AccountInfo from "./components/accountinfo.jsx";
import ProfileInfo from "./components/profileinfo.jsx";
import SecurityInfo from "./components/securityinfo.jsx";
import NotificationsInfo from "./components/notifications.jsx";

// Lista de seções para o accordion
const settingsSections = [
    {
        id: "profile",
        title: "Informações do Perfil",
        Icon: IoPersonOutline,
        Content: ProfileInfo,
    },
    {
        id: "account",
        title: "Dados da Conta",
        Icon: IoSettingsOutline,
        Content: AccountInfo,
    },
    {
        id: "security",
        title: "Segurança e Privacidade",
        Icon: IoShieldCheckmarkOutline,
        Content: SecurityInfo,
    },
    {
        id: "notifications",
        title: "Notificações",
        Icon: IoNotificationsOutline,
        Content: NotificationsInfo,
    },
];

function Settings() {
    const [openSection, setOpenSection] = useState("profile");
    const navigate = useNavigate(); // Hook para navegação

    const handleToggleSection = (sectionId) => {
        setOpenSection((prevOpenSection) => (prevOpenSection === sectionId ? null : sectionId));
    };

    // Função para realizar o logout do usuário
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Erro ao fazer logout:', error);
            alert('Não foi possível sair. Tente novamente.');
        } else {
            // Redireciona para a página de autenticação após o logout bem-sucedido
            navigate('/auth'); 
        }
    };

    return (
        <div className="settings-container">
            <header className="settings-page-header">
                <h1>Configurações</h1>
            </header>

            <div className="settings-list">
                {settingsSections.map(({ id, title, Icon, Content }) => (
                    <div className="settings-section" key={id}>
                        <div
                            className={`settings-header ${openSection === id ? "open" : ""}`}
                            onClick={() => handleToggleSection(id)}
                        >
                            <div className="settings-title">
                                <Icon />
                                <h2>{title}</h2>
                            </div>
                            <IoIosArrowDown className="arrow-icon" />
                        </div>

                        <div className={`settings-content ${openSection === id ? "open" : ""}`}>
                            <div className="settings-content-inner">
                                <Content />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Link Estático: Sobre o Projeto */}
                <Link to="/" className="settings-section static-link">
                    <div className="settings-header">
                        <div className="settings-title">
                            <FiInfo />
                            <h2>Sobre o Projeto</h2>
                        </div>
                    </div>
                </Link>

                {/* Botão Funcional: Sair */}
                <button 
                    className="settings-section static-button"
                    onClick={handleSignOut}
                >
                    <div className="settings-header">
                        <div className="settings-title">
                            <PiSignOutBold />
                            <h2>Sair</h2>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Settings;