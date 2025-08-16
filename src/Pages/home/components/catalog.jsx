// home/components/catalog.jsx
import React, { useState, useEffect } from 'react';
import AnimalCard from './animalcard.jsx';
import { FaArrowRight } from "react-icons/fa";
import { supabase } from '../../../supabaseClient'; // Adicionado

const SkeletonCard = () => (
    <div className="animal-card skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-info">
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

function Catalog() {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);

    // Adicionado: a função searchFn que estava faltando
    const searchFn = async (query) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('animals')
            .select(`
                *,
                pet_photos (*)
            `)
            .ilike('name', `%${query}%`) // Exemplo de busca por nome
            .limit(15);
        
        if (error) {
            console.error('Erro na busca:', error);
            setAnimais([]);
        } else {
            setAnimais(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchAnimais = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('animals')
                .select(`
                    *,
                    pet_photos (*)
                `)
                .limit(15);

            if (error) {
                console.error('Erro ao buscar animais:', error);
                setAnimais([]); // Define um array vazio em caso de erro
            } else {
                console.log("Dados retornados pelo Supabase:", data);
                setAnimais(data || []); // Define os dados (ou um array vazio se data for nulo)
            }
            
            setLoading(false);
        };

        fetchAnimais();
    }, []); // A dependência [] garante que o useEffect rode apenas uma vez

    if (loading) {
        return (
            <section className="catalog-container">
                <header className="catalog-header">
                    <h1>Encontre seu novo amigo:</h1>
                    <a href="/feed" className="see-all-link"><span>Ver todos</span><FaArrowRight /></a>
                </header>
                <div className="catalog-grid">
                    {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
            </section>
        );
    }

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