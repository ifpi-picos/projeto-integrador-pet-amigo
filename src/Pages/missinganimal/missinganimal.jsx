import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import MissingMap from './components/missingmap.jsx';
import MissingList from './components/missinglist.jsx';
import MissingReportModal from './components/MissingReportModal.jsx';
import MyReportsModal from './components/MyReportsModal.jsx';
import './missinganimal.css'; 

import { TbMessageReportFilled } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";

function MissingAnimalPage() {
    const [missingAnimals, setMissingAnimals] = useState([]);
    const [myReportedAnimals, setMyReportedAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isMyReportsModalOpen, setIsMyReportsModalOpen] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchMissingAnimals = useCallback(async () => {
        setLoading(true);
        // Busca na lista principal apenas os animais com status 'missing'
        const { data, error } = await supabase
            .from('missing_animals')
            .select('*')
            .eq('status', 'missing')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Erro ao buscar animais desaparecidos:', error);
        } else {
            setMissingAnimals(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMissingAnimals();
    }, [fetchMissingAnimals]);

    const handleOpenMyReports = async () => {
        if (!user) {
            alert("Você precisa estar logado para ver seus reportes.");
            navigate('/auth');
            return;
        }
        
        // Busca todos os animais (missing e found) reportados pelo usuário logado
        const { data, error } = await supabase
            .from('missing_animals')
            .select('*')
            .eq('reporter_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            alert("Erro ao buscar seus animais reportados.");
        } else {
            setMyReportedAnimals(data || []);
            setIsMyReportsModalOpen(true);
        }
    };

    return (
        <div className="missing-animal-page">
            <h1 className="missingpage-title">Mapa de Animais Desaparecidos</h1>
            {loading ? (
                <div className="map-loading-placeholder">Carregando mapa...</div>
            ) : (
                <MissingMap animals={missingAnimals} />
            )}

            <div className='missingpage-user-actions'> 
                <button className='action-button primary' onClick={() => setIsReportModalOpen(true)}>
                    <TbMessageReportFilled />
                    <span>Reportar</span>
                </button>
                <button className='action-button secondary' onClick={handleOpenMyReports}>
                    <TbReportSearch />
                    <span>Meus Animais Reportados</span>
                </button>
            </div>
            
            <MissingList animals={missingAnimals} loading={loading} />

            {isReportModalOpen && (
                <MissingReportModal 
                    onClose={() => setIsReportModalOpen(false)} 
                    onSuccess={fetchMissingAnimals}
                />
            )}

            {isMyReportsModalOpen && (
                <MyReportsModal 
                    animals={myReportedAnimals}
                    onClose={() => setIsMyReportsModalOpen(false)}
                    onUpdate={handleOpenMyReports}
                />
            )}
        </div>
    );
}

export default MissingAnimalPage;