import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

function EditPetPopup({ pet, onClose, onPetUpdate }) {
    // CORRIGIDO: O estado é inicializado com todas as chaves como strings vazias
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        age: '',
        breed: '',
        location: '',
    });
    const [existingPhotos, setExistingPhotos] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                description: pet.description || '',
                age: pet.age || '',
                breed: pet.breed || '',
                location: pet.location || '',
            });
            setExistingPhotos(pet.pet_photos || []);
        }
    }, [pet]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewPhotos([...e.target.files]);
    };

    const markPhotoForDeletion = (photoId) => {
        if (photosToDelete.includes(photoId)) {
            setPhotosToDelete(photosToDelete.filter(id => id !== photoId));
        } else {
            setPhotosToDelete([...photosToDelete, photoId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // PASSO 1: DELETAR FOTOS MARCADAS
            if (photosToDelete.length > 0) {
                const photosToRemove = existingPhotos.filter(p => photosToDelete.includes(p.id));
                const pathsToRemove = photosToRemove.map(p => {
                    const urlParts = p.url.split('/assets-db/');
                    return urlParts.length > 1 ? urlParts[1] : null;
                }).filter(Boolean);

                if (pathsToRemove.length > 0) {
                    await supabase.storage.from('assets-db').remove(pathsToRemove);
                }

                const { error: deleteDbError } = await supabase
                    .from('pet_photos')
                    .delete()
                    .in('id', photosToDelete);
                if (deleteDbError) throw deleteDbError;
            }

            // PASSO 2: UPLOAD DE NOVAS FOTOS
            if (newPhotos.length > 0) {
                const photoUploadPromises = newPhotos.map(async (file) => {
                    const fileExtension = file.name.split(".").pop();
                    const fileName = `${pet.id}/${uuidv4()}.${fileExtension}`;
                    const filePath = `animais/${fileName}`;

                    await supabase.storage.from("assets-db").upload(filePath, file);
                    const { data: { publicUrl } } = supabase.storage.from("assets-db").getPublicUrl(filePath);
                    return { pet_id: pet.id, url: publicUrl, is_cover: false };
                });
                const photosToInsert = await Promise.all(photoUploadPromises);
                await supabase.from("pet_photos").insert(photosToInsert);
            }

            // PASSO 3: ATUALIZAR DADOS DO ANIMAL
            await supabase
                .from('animals')
                .update({
                    name: formData.name,
                    description: formData.description,
                    age: formData.age,
                    breed: formData.breed,
                    location: formData.location,
                })
                .eq('id', pet.id);

            onPetUpdate();
            onClose();

        } catch (err) {
            setError(err.message);
            console.error("Erro ao atualizar o pet:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>&times;</button>
                <h2>Editar Informações de {pet.name}</h2>
                <form onSubmit={handleSubmit} className="edit-pet-form">
                    <label>Nome</label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                    
                    <label>Descrição</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                    <label>Idade (meses)</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                    
                    <label>Raça</label>
                    <input name="breed" value={formData.breed} onChange={handleChange} />
                    
                    <label>Localização</label>
                    <input name="location" value={formData.location} onChange={handleChange} />

                    <hr />
                    
                    <div className="photo-manager">
                        <label>Gerenciar Fotos</label>
                        <div className="existing-photos-grid">
                            {existingPhotos.map(photo => (
                                <div key={photo.id} className="photo-thumbnail-container">
                                    <img 
                                        src={photo.url} 
                                        alt="Miniatura" 
                                        className={photosToDelete.includes(photo.id) ? 'marked-for-deletion' : ''}
                                    />
                                    <button 
                                        type="button" 
                                        className="delete-photo-btn"
                                        onClick={() => markPhotoForDeletion(photo.id)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <label>Adicionar Novas Fotos</label>
                        <input type="file" onChange={handleFileChange} multiple accept="image/*" />
                    </div>

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

export default EditPetPopup;