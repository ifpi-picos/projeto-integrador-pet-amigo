import React, { useState, useEffect } from "react";
import "./home.css";
import Top from "./components/top.jsx";
import Carousel from "./components/carousel.jsx";
import Catalog from "./components/catalog.jsx";
import Categories from "./components/categories.jsx";
import { supabase } from "../../supabaseClient";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true); // Começa como true
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // useEffect agora busca os animais com base no searchTerm
    useEffect(() => {
        const fetchAnimals = async () => {
            setLoading(true);
            
            let query = supabase
                .from('animals')
                .select(`*, pet_photos(*)`);

            // Se houver um termo de busca, adiciona o filtro
            if (searchTerm) {
                // Usando 'ilike' para busca case-insensitive
                query = query.ilike('name', `%${searchTerm}%`);
            }

            const { data, error } = await query.limit(15);
            
            if (error) {
                console.error('Erro ao buscar animais:', error);
                setAnimais([]);
            } else {
                setAnimais(data || []);
            }
            setLoading(false);
        };
        
        fetchAnimals();
    }, [searchTerm]); // Re-executa a busca sempre que o searchTerm mudar

    return (
        <div className="home-page">
            {/* Passa o estado e as funções de controle para o Top.jsx */}
            <Top 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onOpenSidebar={() => setIsSidebarOpen(true)} 
            />
            <Carousel />
            <Categories />
            {/* O Catalog agora só recebe os dados para exibir */}
            <Catalog animais={animais} loading={loading} />
        </div>
    );
}

export default Home;