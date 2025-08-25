import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import DefaultPetImage from '@/assets/error-image.png'; 

// Recebe a nova função onInfoClick
function MissingCard({ animal, onInfoClick }) {
    const photoUrl = animal.photo_url || DefaultPetImage; 
    
    return (
        <div className="missing-card">
            <img src={photoUrl} alt={`Foto de ${animal.pet_name}`} className="missing-card-image" />
            <div className="missing-card-info">
                <h3>{animal.pet_name}</h3>
                <p className="missing-card-breed">{animal.breed || 'Raça não informada'} • {animal.species}</p>
                {animal.last_seen_address && (
                    <p className="missing-card-location">
                        <IoLocationSharp />
                        Visto por último em {animal.last_seen_address}
                    </p>
                )}
                <span className="missing-card-date">
                    Desaparecido em {new Date(animal.last_seen_date).toLocaleDateString()}
                </span>
            </div>
            {/* O botão agora é o último elemento para dar mais destaque */}
            <div className="missing-card-actions">
                <button 
                    className="info-button" 
                    onClick={() => onInfoClick(animal)} // Chama a função com os dados do animal
                >
                    Tenho Informações
                </button>
            </div>
        </div>
    );
}

export default MissingCard;