import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DefaultPetImage from '@/assets/error-image.png';

function AnimalCard({ animal }) {
    const photos = animal.pet_photos || [];
    let photoUrl = DefaultPetImage;

    if (photos.length > 0) {
        const coverPhoto = photos.find(p => p.is_cover === true);
        photoUrl = coverPhoto ? coverPhoto.url : photos[0].url;
    }

    return (
        <Link to={`/pet/${animal.id}`} className="animal-card">
            <img src={photoUrl} alt={`Foto do ${animal.name}`} />
            <div className="animal-info">
                <h3>{animal.name}</h3>
                {/* CORREÇÃO: Trocado 'animal.race' por 'animal.breed' */}
                <p className="animal-breed">{animal.breed} • {animal.species}</p>
                {animal.location && (
                    <p className="animal-location">
                        <IoLocationSharp /> 
                        {animal.location}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default AnimalCard;