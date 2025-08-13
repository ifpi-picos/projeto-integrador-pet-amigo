// home/components/catalog.jsx
import React from 'react';
import AnimalCard from './animalcard.jsx';
import { FaArrowRight } from "react-icons/fa";

const SkeletonCard = () => (
    <div className="animal-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-info">
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

// O componente agora recebe 'animais' e 'loading' como props
function Catalog({ animais, loading }) { 
    // Renderização condicional para os estados
    if (loading) {
        return (
            <section className="catalog-container">
                <header className="catalog-header"> 
                    <h1>Encontre seu novo amigo:</h1>
                    <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
                </header>
                <div className="catalog-grid">
                    {/* Renderiza 3 esqueletos enquanto carrega */}
                    {[...Array(3)].map((_, index) => <SkeletonCard key={index} />)}
                </div>
            </section>
        );
    }
    
    // Renderiza a lista de animais ou uma mensagem se estiver vazia
    return (
        <section className="catalog-container">
            <header className="catalog-header"> 
                <h1>Encontre seu novo amigo:</h1>
                <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
            </header>
            <div className="catalog-grid">
                {animais.length > 0 ? (
                    animais.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} />
                    ))
                ) : (
                    <p className="no-animals-message">Nenhum animal para adoção encontrado. Seja o primeiro a cadastrar um!</p>
                )}
            </div>
            {animais.length > 0 && (
                <div className='see-all-link-mobile'>
                    <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
                </div>
            )}
        </section>
    );
}

export default Catalog;