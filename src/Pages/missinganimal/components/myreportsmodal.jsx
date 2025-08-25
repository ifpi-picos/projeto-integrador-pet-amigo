import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { FaCheckCircle, FaSearch, FaPaw, FaSpinner } from 'react-icons/fa'; // Ícones

function MyReportsModal({ animals, onClose, onUpdate }) {
    // Carregamento individual por ID e estado de erro
    const [loadingId, setLoadingId] = useState(null);
    const [error, setError] = useState('');

    const handleMarkAsFound = async (animalId) => {
        // 1. Adiciona confirmação para evitar cliques acidentais
        const confirmed = window.confirm("Você tem certeza que deseja marcar este animal como encontrado? Esta ação não pode ser desfeita.");
        if (!confirmed) return;

        setLoadingId(animalId); // Ativa o loading para este item específico
        setError('');

        const { error } = await supabase
            .from('missing_animals')
            .update({ status: 'found' })
            .eq('id', animalId);

        if (error) {
            setError("Erro ao atualizar o status. Tente novamente."); // 2. Usa o estado de erro
            console.error(error);
        } else {
            onUpdate(); // Atualiza a lista no componente pai
        }
        setLoadingId(null); // Desativa o loading
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content my-reports-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Meus Animais Reportados</h2>
                <p className="modal-subtitle">Aqui você pode gerenciar os animais que reportou como desaparecidos.</p>
                
                {error && <p className="error-message">{error}</p>}

                <div className="my-reports-list">
                    {animals.length === 0 ? (
                        // 3. Estado de "lista vazia" aprimorado
                        <div className="empty-state">
                            <FaPaw size={48} />
                            <h3>Nenhum reporte encontrado</h3>
                            <p>Você ainda não reportou nenhum animal desaparecido.</p>
                        </div>
                    ) : (
                        animals.map(animal => (
                            <div key={animal.id} className="my-report-item">
                                <img src={animal.photo_url} alt={animal.pet_name} className="report-item-photo" />
                                <div className="report-info">
                                    <h4>{animal.pet_name}</h4>
                                    <span className={`status-badge status-${animal.status}`}>
                                        {animal.status === 'found' ? <FaCheckCircle /> : <FaSearch />}
                                        {animal.status === 'found' ? 'Encontrado' : 'Desaparecido'}
                                    </span>
                                </div>
                                <div className="report-actions">
                                    {animal.status === 'missing' && (
                                        <button 
                                            className="mark-found-button"
                                            onClick={() => handleMarkAsFound(animal.id)}
                                            disabled={loadingId !== null} // Desabilita todos os botões durante uma operação
                                        >
                                            {/* 4. Feedback de loading individual */}
                                            {loadingId === animal.id ? (
                                                <FaSpinner className="spinner" />
                                            ) : (
                                                'Marcar como Encontrado'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReportsModal;