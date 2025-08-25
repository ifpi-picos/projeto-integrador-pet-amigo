import React from 'react';
import MissingCard from './missingcard.jsx';

function MissingList({ animals, loading }) {
    if (loading) {
        return <p>Carregando lista...</p>;
    }

    return (
        <section className="missing-list-section">
            <h2 className="missing-list-title">Reportados Recentemente</h2>
            {animals.length === 0 ? (
                <p>Nenhum animal desaparecido encontrado.</p>
            ) : (
                <div className="missing-cards-grid">
                    {animals.map(animal => (
                        <MissingCard 
                            key={animal.id} 
                            animal={animal}
                            // Exemplo de ação: abrir um chat no WhatsApp com o dono
                            onInfoClick={(pet) => {
                                const message = `Olá! Tenho informações sobre o desaparecimento de ${pet.pet_name}.`;
                                const whatsappUrl = `https://wa.me/${pet.contact_phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default MissingList;