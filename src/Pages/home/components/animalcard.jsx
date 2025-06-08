import React from 'react';
// Opcional: ícone para a localização
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AnimalCard({ animal }) {
    // Agora usamos os nomes em inglês que vêm do banco de dados
    return (
        <Link to="/animal" className="animal-card">
            <img src={animal.url_photo} alt={`Foto do ${animal.name}`} />
            <div className="animal-info">
                <h3>{animal.name}</h3>
                {/* A espécie agora é um campo de texto simples */}
                <p className="animal-breed">{animal.race} • {animal.species}</p>
                {/* Adicionando a localização, se ela existir */}
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