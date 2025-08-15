// home/index.jsx
import React, { useState, useEffect } from "react";
import "./home.css";
import Top from "./components/top.jsx";
import Carousel from "./components/carousel.jsx";
import Catalog from "./components/catalog.jsx";
import Categories from "./components/categories.jsx";
import FilterSidebar from "./components/FilterSidebar.jsx";
import { supabase } from "../../supabaseClient";

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Ajusta a consulta para buscar os animais e suas fotos de capa
                let query = supabase
                    .from('Animais')
                    .select(`
                        *, 
                        pet_photos!inner(url, is_cover)
                    `)
                    .eq('pet_photos.is_cover', true);

                if (searchTerm) {
                    query = supabase.rpc('search_animais', { search_term: searchTerm });
                }

                const { data: animaisData, error: animaisError } = await query;
                
                if (animaisError) {
                    console.error('Erro na busca de animais:', animaisError);
                    return;
                }
                
                setAnimais(animaisData || []);
            } catch (err) {
                console.error('Erro inesperado:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [searchTerm]);

    return (
        <div className="home-page">
            <Top searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenSidebar={() => setIsSidebarOpen(true)} />
            <Carousel />
            <Categories />
            {/* Passando os dados e o estado de carregamento para o componente Catalog */}
            <Catalog animais={animais} loading={loading} searchTerm={searchTerm} />
            <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
}

export default Home;