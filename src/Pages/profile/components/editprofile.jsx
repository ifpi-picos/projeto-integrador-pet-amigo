import React, {useState, useEffect } from 'react'
import { supabase } from '../../../supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

function EditProfilePopup({ profile, onClose, onProfileUpdate }) {
    const { user } = useAuth();
    
    // Estado para os campos de texto do formulário
    const [formData, setFormData] = useState({  
        bio: '',
        phone: '',
        display_name: '',
        full_name: '',
        ong_name: '',
        responsible_name: ''
    });

    // Estados separados para os arquivos de imagem
    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (profile) {
            setFormData({
                bio: profile.bio || '',
                phone: profile.phone || '',
                display_name: profile.display_name || '',
                full_name: profile.full_name || '',
                ong_name: profile.ong_name || '',
                responsible_name: profile.responsible_name || ''
            });
            // Define os previews iniciais com as imagens existentes
            setAvatarPreview(profile.avatar_url);
            setBannerPreview(profile.url_banner);
        }
    }, [profile]);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };
    
    const uploadImage = async (file, folder) => {
        if (!file) return null;
        const fileExtension = file.name.split('.').pop();
        const filePath = `${folder}/${user.id}/${uuidv4()}.${fileExtension}`; // Organiza por ID de usuário

        await supabase.storage.from('assets-db').upload(filePath, file, { upsert: true });
        const { data: { publicUrl } } = supabase.storage.from('assets-db').getPublicUrl(filePath);
        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Faz o upload das novas imagens (se houver)
            const newAvatarUrl = await uploadImage(avatarFile, 'avatares');
            const newBannerUrl = await uploadImage(bannerFile, 'banners');

            // 2. Prepara os dados para atualização
            let tableName = profile.user_type === 'PESSOA' ? 'user_profiles' : 'ong_profiles';
            let dataToUpdate = profile.user_type === 'PESSOA' 
                ? { display_name: formData.display_name, full_name: formData.full_name, bio: formData.bio, phone: formData.phone }
                : { ong_name: formData.ong_name, responsible_name: formData.responsible_name, bio: formData.bio, phone: formData.phone };
            
            // Adiciona as novas URLs apenas se um novo arquivo foi enviado
            if (newAvatarUrl) dataToUpdate.avatar_url = newAvatarUrl;
            if (newBannerUrl) dataToUpdate.url_banner = newBannerUrl;

            // 3. Atualiza a tabela de perfil no banco
            const { error: updateError } = await supabase.from(tableName).update(dataToUpdate).eq('id', profile.id);
            if (updateError) throw updateError;
            
            onProfileUpdate(); // Avisa o pai para recarregar os dados
            onClose(); // Fecha o popup

        } catch (err) {
            setError(err.message);
            console.error("Erro ao atualizar perfil:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>&times;</button>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    {profile.user_type === 'PESSOA' ? (
                        <>
                            <label>Nome de Exibição</label>
                            <input name="display_name" value={formData.display_name} onChange={handleTextChange} />
                            <label>Nome Completo</label>
                            <input name="full_name" value={formData.full_name} onChange={handleTextChange} />
                        </>
                    ) : (
                        <>
                            <label>Nome da ONG</label>
                            <input name="ong_name" value={formData.ong_name} onChange={handleTextChange} />
                            <label>Nome do Responsável</label>
                            <input name="responsible_name" value={formData.responsible_name} onChange={handleTextChange} />
                        </>
                    )}
                    
                    <label>Biografia</label>
                    <textarea name="bio" value={formData.bio} onChange={handleTextChange}></textarea>
                    
                    <label>Telefone</label>
                    <input name="phone" value={formData.phone} onChange={handleTextChange} />
                    
                    <hr />
                    
                    <label>Foto de Perfil</label>
                    {avatarPreview && <img src={avatarPreview} alt="Preview do Avatar" className="image-preview" />}
                    <input type="file" onChange={handleAvatarChange} accept="image/*" />
                    
                    <label>Banner do Perfil</label>
                    {bannerPreview && <img src={bannerPreview} alt="Preview do Banner" className="image-preview banner-preview" />}
                    <input type="file" onChange={handleBannerChange} accept="image/*" />

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