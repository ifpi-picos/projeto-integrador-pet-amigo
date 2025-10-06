import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

function AdCampaigns() {
    const [ads, setAds] = useState([]);
    const [formData, setFormData] = useState({ title: '', link_url: '', duration: '7' });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const fetchAds = useCallback(async () => {
        setLoading(true);
        // CORREÇÃO: Consultar a view segura 'admin_advertisements'
        const { data, error } = await supabase
            .from('admin_advertisements') // <-- A MUDANÇA ESTÁ AQUI
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setFeedback({ type: 'error', message: `Erro ao carregar anúncios: ${error.message}` });
        } else {
            setAds(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleCreateAd = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setFeedback({ type: 'error', message: 'Por favor, selecione uma imagem.' });
            return;
        }
        setIsSubmitting(true);
        setFeedback({ type: '', message: '' });

        try {
            const fileExtension = imageFile.name.split('.').pop();
            const filePath = `campaigns/${uuidv4()}.${fileExtension}`;
            await supabase.storage.from('assets-db').upload(filePath, imageFile);
            const { data: { publicUrl } } = supabase.storage.from('assets-db').getPublicUrl(filePath);

            let expires_at = null;
            if (formData.duration !== 'permanent') {
                expires_at = new Date();
                expires_at.setDate(expires_at.getDate() + parseInt(formData.duration));
            }

            const { error } = await supabase.from('advertisements').insert({
                title: formData.title,
                link_url: formData.link_url,
                image_url: publicUrl,
                expires_at: expires_at,
            });

            if (error) throw error;
            
            setFeedback({ type: 'success', message: 'Campanha publicada com sucesso!' });
            setFormData({ title: '', link_url: '', duration: '7' });
            setImageFile(null);
            document.getElementById('image-input').value = null;
            fetchAds();

        } catch (error) {
            setFeedback({ type: 'error', message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleAdStatus = async (ad) => {
        const { error } = await supabase
            .from('advertisements')
            .update({ is_active: !ad.is_active })
            .eq('id', ad.id);
        if (error) alert(error.message);
        else fetchAds();
    };
    
    const handleDeleteAd = async (ad) => {
        if (window.confirm("Tem certeza? Isso deletará o registro e a imagem.")) {
            try {
                const path = new URL(ad.image_url).pathname.split('/assets-db/')[1];
                if (path) {
                    await supabase.storage.from('assets-db').remove([path]);
                }
                
                await supabase.from('advertisements').delete().eq('id', ad.id);
                fetchAds();

            } catch (error) {
                alert(`Erro ao deletar: ${error.message}`);
            }
        }
    };

    return (
        <div className="ad-campaigns-manager">
            {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
            
            <h4>Criar Novo Anúncio</h4>
            <form onSubmit={handleCreateAd} className="ad-create-form">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Título do anúncio" required />
                <input name="link_url" value={formData.link_url} onChange={handleChange} placeholder="URL de Destino (ex: /pet/123)" />
                <select name="duration" value={formData.duration} onChange={handleChange}>
                    <option value="7">Ativo por 1 Semana</option>
                    <option value="30">Ativo por 1 Mês</option>
                    <option value="permanent">Permanente</option>
                </select>
                <input id="image-input" type="file" onChange={handleFileChange} accept="image/*" required />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Publicando...' : 'Criar Anúncio'}
                </button>
            </form>

            <hr />

            <h4>Anúncios Atuais</h4>
            <div className="ads-list">
                {loading ? <p>Carregando...</p> : (
                    ads.length === 0 ? <p>Nenhuma campanha encontrada.</p> :
                    ads.map(ad => (
                        <div key={ad.id} className={`ad-item ${!ad.is_active || (ad.expires_at && new Date(ad.expires_at) < new Date()) ? 'inactive' : ''}`}>
                            <img src={ad.image_url} alt={ad.title} />
                            <div className="ad-details">
                                <strong>{ad.title}</strong>
                                <span>Expira em: {ad.expires_at ? new Date(ad.expires_at).toLocaleDateString() : 'Nunca'}</span>
                            </div>
                            <div className="ad-actions">
                                <button onClick={() => toggleAdStatus(ad)}>{ad.is_active ? 'Desativar' : 'Ativar'}</button>
                                <button onClick={() => handleDeleteAd(ad)} className="delete-btn">Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AdCampaigns;