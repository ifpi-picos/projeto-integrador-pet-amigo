import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaUpload } from 'react-icons/fa';

function MissingReportModal({ onClose, onSuccess }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        pet_name: '',
        species: 'dog',
        breed: '',
        size: 'medium',
        description: '',
        last_seen_address: '',
        last_seen_date: new Date().toISOString().split('T')[0],
        contact_phone: '',
        reward: '',
        latitude: null,
        longitude: null,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const primaryColor = '#26cc6b';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl); // Limpa o preview anterior
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const generateAndDownloadPdf = async (reportData, photoUrl) => {
        // ... (sua função de gerar PDF permanece a mesma)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) { setError("Você precisa estar logado para reportar."); return; }
        if (!selectedFile) { setError("Por favor, adicione uma foto."); return; }
        
        setLoading(true);
        setError('');

        try {
            // --- PASSO 1: GEOCODIFICAÇÃO DO ENDEREÇO ---
            let coords = { latitude: null, longitude: null };
            if (formData.last_seen_address) {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.last_seen_address)}`);
                const geoData = await response.json();
                if (geoData && geoData.length > 0) {
                    coords.latitude = parseFloat(geoData[0].lat);
                    coords.longitude = parseFloat(geoData[0].lon);
                } else {
                    console.warn("Não foi possível encontrar coordenadas para o endereço fornecido.");
                }
            }

            // --- PASSO 2: UPLOAD DA FOTO ---
            const fileExtension = selectedFile.name.split('.').pop();
            const filePath = `missing/${user.id}/${uuidv4()}.${fileExtension}`;
            await supabase.storage.from('assets-db').upload(filePath, selectedFile);
            const { data: { publicUrl } } = supabase.storage.from('assets-db').getPublicUrl(filePath);

            // --- PASSO 3: INSERIR NO BANCO ---
            const reportData = { 
                ...formData, 
                reporter_id: user.id, 
                photo_url: publicUrl,
                latitude: coords.latitude, // Salva a latitude encontrada
                longitude: coords.longitude // Salva a longitude encontrada
            };
            
            const { data: newReport, error: insertError } = await supabase.from('missing_animals').insert(reportData).select().single();
            if (insertError) throw insertError;
            
            // --- PASSO 4: GERAR E BAIXAR O PDF ---
            await generateAndDownloadPdf(newReport, publicUrl);

            onSuccess();
            onClose();

        } catch (err) {
            console.error(err);
            setError(err.message || "Erro ao reportar animal.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Reportar Animal Desaparecido</h2>
                <form onSubmit={handleSubmit} className="missing-report-form">
                    <div className="form-column">
                        <label htmlFor="pet_name">Nome do Pet *</label>
                        <input id="pet_name" name="pet_name" value={formData.pet_name} onChange={handleChange} required />

                        <label htmlFor="species">Espécie *</label>
                        <select id="species" name="species" value={formData.species} onChange={handleChange} required>
                            <option value="dog">Cachorro</option>
                            <option value="cat">Gato</option>
                            <option value="other">Outro</option>
                        </select>
                        
                        <label htmlFor="breed">Raça</label>
                        <input id="breed" name="breed" value={formData.breed} onChange={handleChange} />

                        <label htmlFor="size">Porte</label>
                        <select id="size" name="size" value={formData.size} onChange={handleChange}>
                             <option value="small">Pequeno</option>
                             <option value="medium">Médio</option>
                             <option value="large">Grande</option>
                        </select>

                        <label htmlFor="description">Descrição</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Cores, características, coleira..."></textarea>
                    </div>

                    <div className="form-column">
                        <label htmlFor="photo">Foto do Animal *</label>
                        <label htmlFor="photo" className="file-input-label-styled">
                            <FaUpload />
                            <span>{selectedFile ? selectedFile.name : 'Escolha uma foto'}</span>
                        </label>
                        <input id="photo" type="file" onChange={handleFileChange} required accept="image/*" className="file-input-hidden" />
                        {previewUrl && <img src={previewUrl} alt="Preview" className="photo-preview" />}

                        <label htmlFor="last_seen_address">Última vez visto em (Endereço) *</label>
                        <input id="last_seen_address" name="last_seen_address" value={formData.last_seen_address} onChange={handleChange} required />

                        <label htmlFor="last_seen_date">Data do Desaparecimento *</label>
                        <input id="last_seen_date" type="date" name="last_seen_date" value={formData.last_seen_date} onChange={handleChange} required />

                        <label htmlFor="contact_phone">Telefone para Contato *</label>
                        <input id="contact_phone" name="contact_phone" type="tel" value={formData.contact_phone} onChange={handleChange} required />

                        <label htmlFor="reward">Recompensa (Opcional)</label>
                        <input id="reward" name="reward" value={formData.reward} onChange={handleChange} placeholder="Ex: R$ 100,00" />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="submit-report-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Reportar e Gerar Cartaz'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MissingReportModal;