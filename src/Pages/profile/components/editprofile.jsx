import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

function EditProfilePopup({ profile, onClose, onProfileUpdate }) {
    // Inicializa o estado do formulário com os dados do perfil atual
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (profile) {
            setFormData({
                // Campos comuns
                avatar_url: profile.avatar_url || '',
                url_banner: profile.url_banner || '',
                bio: profile.bio || '',
                phone: profile.phone || '',
                // Campos específicos de Pessoa
                display_name: profile.display_name || '',
                full_name: profile.full_name || '',
                // Campos específicos de ONG
                ong_name: profile.ong_name || '',
                responsible_name: profile.responsible_name || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let tableName = '';
        let dataToUpdate = {};

        // Prepara os dados com base no tipo de perfil
        if (profile.user_type === 'PESSOA') {
            tableName = 'user_profiles';
            dataToUpdate = {
                display_name: formData.display_name,
                full_name: formData.full_name,
                bio: formData.bio,
                phone: formData.phone,
                avatar_url: formData.avatar_url,
                url_banner: formData.url_banner
            };
        } else {
            tableName = 'ong_profiles';
            dataToUpdate = {
                ong_name: formData.ong_name,
                responsible_name: formData.responsible_name,
                bio: formData.bio,
                phone: formData.phone,
                avatar_url: formData.avatar_url,
                url_banner: formData.url_banner
            };
        }

        const { error: updateError } = await supabase
            .from(tableName)
            .update(dataToUpdate)
            .eq('id', profile.id);

        setLoading(false);

        if (updateError) {
            setError(updateError.message);
            console.error("Erro ao atualizar perfil:", updateError);
        } else {
            onProfileUpdate(); // Avisa o pai que os dados mudaram para recarregar
            onClose(); // Fecha o popup
        }
    };

    // Impede que o clique dentro do popup o feche
    const handlePopupContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={handlePopupContentClick}>
                <button className="popup-close-btn" onClick={onClose}>&times;</button>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    {/* Renderização condicional dos campos */}
                    {profile.user_type === 'PESSOA' ? (
                        <>
                            <label htmlFor="display_name">Nome de Exibição</label>
                            <input id="display_name" name="display_name" value={formData.display_name || ''} onChange={handleChange} />
                            
                            <label htmlFor="full_name">Nome Completo</label>
                            <input id="full_name" name="full_name" value={formData.full_name || ''} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <label htmlFor="ong_name">Nome da ONG</label>
                            <input id="ong_name" name="ong_name" value={formData.ong_name || ''} onChange={handleChange} />
                            
                            <label htmlFor="responsible_name">Nome do Responsável</label>
                            <input id="responsible_name" name="responsible_name" value={formData.responsible_name || ''} onChange={handleChange} />
                        </>
                    )}
                    
                    <label htmlFor="bio">Biografia</label>
                    <textarea id="bio" name="bio" value={formData.bio || ''} onChange={handleChange}></textarea>
                    
                    <label htmlFor="phone">Telefone</label>
                    <input id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
                    
                    <label htmlFor="avatar_url">URL da Foto de Perfil</label>
                    <input id="avatar_url" name="avatar_url" value={formData.avatar_url || ''} onChange={handleChange} />
                    
                    <label htmlFor="url_banner">URL do Banner</label>
                    <input id="url_banner" name="url_banner" value={formData.url_banner || ''} onChange={handleChange} />

                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="popup-actions">
                        <button type="button" className="secondary-button" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="primary-button" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePopup;