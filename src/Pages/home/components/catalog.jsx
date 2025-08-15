import React, { useState, useEffect } from 'react';
import AnimalCard from './animalcard.jsx';
import { supabase } from '../../../supabaseClient.js';
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

function Catalog() {
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimais = async () => {
            setLoading(true);

            // CORREÇÃO: Usando o nome correto da tabela 'animals' (minúsculo)
            const { data, error } = await supabase
                .from('animals') 
                .select(`
                    *, 
                    pet_photos (*)
                `)
                .limit(15);

            if (error) {
                console.error('Erro ao buscar animais:', error);
            } else {
                setAnimais(data);
            }
            setLoading(false);

            if (error) {
                console.error('Erro ao buscar animais:', error);
            } else {
                // ADICIONE ESTE CONSOLE.LOG
                console.log("Dados retornados pelo Supabase:", data); 
                setAnimais(data);
            }
        };

        fetchAnimais();
    }, []);

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
