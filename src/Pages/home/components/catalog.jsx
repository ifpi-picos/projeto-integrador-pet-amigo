// home/components/catalog.jsx
import React from 'react'; // Não precisamos mais de useState e useEffect aqui
import AnimalCard from './animalcard.jsx';
import { FaArrowRight } from "react-icons/fa";

// O "esqueleto" do card permanece igual
const SkeletonCard = () => (
    <div className="animal-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-info">
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

// 1. O componente agora recebe os dados via props
function Catalog({ animais, loading, searchTerm }) {

    // 2. A lógica de carregamento e esqueleto permanece
    if (loading) {
        return (
            <section className="catalog-container">
                <header className="catalog-header">
                    <h1>Encontre seu novo amigo:</h1>
                    {/* O link "Ver todos" permanece */}
                    <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
                </header>
                <div className="catalog-grid">
                    {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
                <div className='see-all-link-mobile'>
                    <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
                </div>
            </section>
        );
    }

    // 3. Adicionamos as novas condições para "sem resultados"
    if (!loading && animais.length === 0 && searchTerm) {
        return (
            <section className="catalog-container">
                <header className="catalog-header">
                    <h1>Resultados da busca:</h1>
                </header>
                <p>Nenhum animal encontrado para "{searchTerm}".</p>
            </section>
        );
    }
    
    // 4. Se não há animais e a busca está vazia (primeira carga, sem resultados)
    if (!loading && animais.length === 0 && !searchTerm) {
        return (
            <section className="catalog-container">
                <header className="catalog-header">
                    <h1>Encontre seu novo amigo:</h1>
                </header>
                <p>Ainda não há animais cadastrados.</p>
            </section>
        );
    }


    // 5. A renderização normal dos animais quando há resultados
    return (
        <section className="catalog-container">
            <header className="catalog-header">
                <h1>{searchTerm ? 'Resultados da busca:' : 'Encontre seu novo amigo:'}</h1>
                <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
            </header>
            <div className="catalog-grid">
                {animais.map(animal => (
                    <AnimalCard key={animal.id} animal={animal} />
                ))}
            </div>
            <div className='see-all-link-mobile'>
                <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
            </div>
        </section>
    );
}

export default Catalog;