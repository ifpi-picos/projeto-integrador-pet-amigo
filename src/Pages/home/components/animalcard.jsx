// home/components/animalcard.jsx
import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AnimalCard({ animal }) {
    // Usando uma URL de placeholder se url_photo for null
    const imageUrl = animal.url_photo || 'https://picsum.photos/600/600'; 

    return (
        <Link to="/animal" className="animal-card">
            <img src={imageUrl} alt={`Foto do ${animal.name}`} />
            <div className="animal-info">
                <h3>{animal.name}</h3>
                <p className="animal-breed">{animal.race} • {animal.species}</p>
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