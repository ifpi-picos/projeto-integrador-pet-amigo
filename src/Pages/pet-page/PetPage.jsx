import React, { useState, useEffect, useCallback } from 'react'; // Adicione useCallback
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '@/context/AuthContext';

import PetPhotos from './components/pet-photos';
import PetDetails from './components/pet-details';
import EditPetPopup from './components/EditPetPopup'; // 1. Importe o popup
import './PetPage.css';

function PetPage() {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useAuth();
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // 2. Estado para o popup

    // 3. Transforme a busca em uma função que pode ser chamada novamente
    const fetchPet = useCallback(async () => {
        if (!petId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        
        const { data, error } = await supabase
            .from('animals')
            .select(`*, pet_photos(*), owners(*, user_profiles(*, addresses(*)), ong_profiles(*, addresses(*)))`)
            .eq('id', petId)
            .single();
        
        if (error) {
            console.error("Erro ao buscar dados do pet:", error);
            setPet(null);
        } else {
            setPet(data);
        }
        setLoading(false);
    }, [petId]);

    useEffect(() => {
        fetchPet();
    }, [fetchPet]);

    if (loading) {
        return <div className="pet-page-loading">Carregando informações do pet...</div>;
    }
    
    if (!pet) {
        return <div className="pet-page-error">Pet não encontrado.</div>;
    }
    
    const isOwner = currentUser && currentUser.id === pet.owner_id;

    return (
        <div className="pet-page-container">
            <PetPhotos pet={pet} />
            {/* 4. Passe a função para abrir o popup para o PetDetails */}
            <PetDetails 
                pet={pet} 
                isOwner={isOwner}
                onEditClick={() => setIsEditPopupOpen(true)}
            />
            
            {/* 5. Renderize o popup condicionalmente */}
            {isEditPopupOpen && (
                <EditPetPopup
                    pet={pet}
                    onClose={() => setIsEditPopupOpen(false)}
                    onPetUpdate={fetchPet} // Passa a função para recarregar os dados do pet
                />
            )}
        </div>
    );
}

export default PetPage;