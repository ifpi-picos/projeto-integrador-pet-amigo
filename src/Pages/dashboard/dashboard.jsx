import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Ícones
import { TbSettingsFilled } from "react-icons/tb";
import { MdError } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { PiMonitor } from "react-icons/pi"; // Ícone para o aviso desktop

// CSS
import './Dashboard.css';

function Dashboard() {
    const { profile, loading } = useAuth();

    if (loading) {
        return <div className="loading-fullscreen">Carregando...</div>;
    }

    const displayName = profile?.user_type === 'ONG' ? profile.ong_name : profile.display_name;

    return (
        <>
            {/* Aviso para telas grandes (só aparece em desktop) */}
            <div className="desktop-warning">
                <PiMonitor />
                <h1>O Pet Amigo é otimizado para dispositivos móveis</h1>
                <p>Para a melhor experiência, por favor, acesse em seu celular ou diminua a largura da sua janela.</p>
            </div>

            {/* Conteúdo principal (só aparece em mobile) */}
            <div className='dashboard-container'>
                <header className='dashboard-header'>
                    <h1>Olá, <span className='green-title'>{displayName || 'Amigo(a)'}!</span></h1>
                    <p>O que você gostaria de fazer hoje?</p>
                </header>
                
                <div className='dashboard-links'>
                    <Link to="/cadastro-animal" className='dashboard-card primary'>
                        <FaPaw className='card-icon' />
                        <div className='card-text'>
                            <h2>Cadastrar Animal</h2>
                            <p>Adicione um novo pet para adoção.</p>
                        </div>
                    </Link>
                    <Link to="/missinganimal" className='dashboard-card secondary'>
                        <MdError className='card-icon' />
                        <div className='card-text'>
                            <h2>Animais Desaparecidos</h2>
                            <p>Reporte ou veja os alertas.</p>
                        </div>
                    </Link>
                </div>
                
                <Link to="/settings" className='dashboard-settings-link'>
                    <TbSettingsFilled />
                    <span>Configurações da Conta</span>
                </Link>
            </div>
        </>
    );
}

export default Dashboard;