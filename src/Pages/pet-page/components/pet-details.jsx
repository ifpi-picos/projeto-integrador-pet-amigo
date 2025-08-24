import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient'; // Importe o Supabase

// Recebe a prop 'isOwner' do componente pai (PetPage.jsx)
function PetDetails({ pet, isOwner, onEditClick }) {
    const navigate = useNavigate();
    const ownerData = pet.owners;

    // Se por algum motivo não houver dados do dono, exibe um erro
    if (!ownerData) {
        return <div className="pet-page-error">Responsável pelo pet não encontrado.</div>;
    }

    const profile = ownerData.user_profiles || ownerData.ong_profiles;
    const userType = ownerData.user_profiles ? 'PESSOA' : 'ONG';

    // Se não houver nem perfil de usuário nem de ONG, exibe um erro
    if (!profile) {
        return <div className="pet-page-error">Detalhes do perfil do responsável não encontrados.</div>;
    }
    
    const ownerDisplayName = userType === 'ONG' ? profile.ong_name : profile.display_name;
    const ownerAvatarUrl = profile.avatar_url
    const ownerId = ownerData.id;
    const phoneNumber = profile.phone;

    const handleAdoptClick = () => {
        if (!phoneNumber) {
            alert('O responsável por este pet não cadastrou um número de telefone.');
            return;
        }
        const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const message = `Olá, ${ownerDisplayName}! Vi o perfil de ${pet.name} no Pet Amigo e tenho interesse em adotá-lo(a).`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${sanitizedPhoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleEdit = () => {
        // No futuro, isso pode abrir um popup de edição.
        console.log("Abrir popup de edição para o pet:", pet.id);
        alert("Funcionalidade de edição a ser implementada!");
    };

    const handleDelete = async () => {
        // Pede confirmação antes de deletar
        if (window.confirm(`Tem certeza que deseja excluir o perfil de ${pet.name}? Esta ação não pode ser desfeita.`)) {
            try {
                // Deleta primeiro as fotos associadas no Storage (opcional, mas recomendado)
                const { data: files, error: listError } = await supabase.storage
                    .from('assets-db')
                    .list(`animais/${pet.id}`);

                if (listError) throw listError;

                if (files && files.length > 0) {
                    const filePaths = files.map(file => `animais/${pet.id}/${file.name}`);
                    await supabase.storage.from('assets-db').remove(filePaths);
                }

                // A exclusão em 'animals' irá apagar em cascata os registros de 'pet_photos' no banco de dados.
                const { error: animalError } = await supabase
                    .from('animals')
                    .delete()
                    .eq('id', pet.id);
                
                if (animalError) throw animalError;
                
                alert(`${pet.name} foi removido com sucesso.`);
                navigate('/home'); // Redireciona para a home após deletar

            } catch (error) {
                console.error("Erro ao deletar o animal:", error);
                alert(`Erro ao deletar: ${error.message}`);
            }
        }
    };

    return (
        <div className="pet-details-card">
            <div className="pet-header">
                <h1 className="pet-name">{pet.name}</h1>
                <div className="pet-tags">
                    <span className="tag">{pet.species}</span>
                    <span className="tag">{pet.breed}</span>
                    <span className="tag">{pet.location}</span>
                </div>
            </div>
            <div className="pet-description">
                <h3>Descrição</h3>
                <p>{pet.description}</p>
            </div>
            <div className="pet-owner-info">
                <h3>Responsável</h3>
                <Link to={`/profile/${ownerId}`} className="owner-card">
                    <img src={ownerAvatarUrl} alt={`Foto de ${ownerDisplayName}`} />
                    <span>{ownerDisplayName || 'Nome não disponível'}</span>
                </Link>
            </div>
            <div className="pet-actions">
                {isOwner ? (
                    <div className="owner-actions">
                        {/* 2. O botão agora chama a função recebida do pai */}
                        <button className="action-button secondary" onClick={onEditClick}>
                            Editar
                        </button>
                        <button className="action-button danger" onClick={handleDelete}>
                            Excluir
                        </button>
                    </div>
                ) : (
                    <button className="action-button primary" onClick={handleAdoptClick}>
                        Quero Adotar
                    </button>
                )}
            </div>
        </div>
    );
}

export default PetDetails;