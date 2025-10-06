import React, { useState } from "react";
import "./AdminPanel.css";
import DashboardChart from "./components/DashboardChart";
import UsersTable from "./components/UsersTable";
import AdminActionModal from "./components/AdminActionModal"; // Importe o modal

// Importe os conteúdos dos modais
import AdCampaigns from "./components/AdCampaigns";

const adminActions = [
    {
        id: 'campaigns',
        label: 'Campanha de Anúncios',
        Content: AdCampaigns,
    },
    {
        id: 'moderation',
        label: 'Moderação de Conteúdo',
        Content: () => <p>Área a ser definida.</p>,
    },
    {
        id: 'analytics',
        label: 'Analytics Detalhado',
        Content: () => <p>Área a ser definida.</p>, 
    },
    {
        id: 'settings',
        label: 'Configurações do Site',
        Content: () => <p>Área a ser definida.</p>,
    }
];

function AdminPanel() {
    // Estado para controlar qual modal está ativo
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalId) => {
        setActiveModal(modalId);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    // Encontra a ação ativa para renderizar o modal correto
    const activeAction = adminActions.find(action => action.id === activeModal);

    return (
        <div className="admin-panel-container">
            <header className="admin-header">
                <h1>Painel de Controle</h1>
                <p>Visão geral e ferramentas de moderação do Pet Amigo.</p>
            </header>

            <div className="charts-grid">
                <DashboardChart title="Novos Usuários" tableName="owners" dateColumn="created_at" />
                <DashboardChart title="Novos Animais Cadastrados" tableName="animals" dateColumn="registration_date" />
            </div>

            {/* Renderiza os botões dinamicamente */}
            <div className="admin-actions">
                {adminActions.map(action => (
                    <button key={action.id} onClick={() => openModal(action.id)}>
                        {action.label}
                    </button>
                ))}
            </div>

            <div className="users-table-section">
                <h2>Gerenciamento de Usuários</h2>
                <UsersTable />
            </div>

            {/* Renderiza o modal se houver uma ação ativa */}
            {activeAction && (
                <AdminActionModal title={activeAction.label} onClose={closeModal}>
                    <activeAction.Content />
                </AdminActionModal>
            )}
        </div>
    );
}

export default AdminPanel;