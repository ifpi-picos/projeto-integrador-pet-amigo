import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import MissingCard from './missingcard';
import MissingForm from "../Componentes/MissingForm.jsx";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './missing.css';

const MissingHomePage = () => {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({
    latitude: -23.5505, 
    longitude: -46.6333
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Busca a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => console.log('Permissão de localização negada ou falha na obtenção')
      );
    }

    // Busca animais do Supabase
    const fetchAnimais = async () => {
      const { data, error } = await supabase.from('missing_animals').select('*');
      if (error) {
        console.error('Erro ao buscar animais:', error);
      } else {
        setAnimais(data || []);
      }
      setLoading(false);
    };

    fetchAnimais();
  }, []);

  // Inicializa o mapa após o carregamento dos dados e da localização
  useEffect(() => {
    // Só renderiza o mapa se não estiver carregando e se a div 'map-container' existir
    if (!loading && document.getElementById('map-container')) {
      // Fix para os ícones do Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Cria o mapa
      const map = L.map('map-container').setView([userLocation.latitude, userLocation.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Adiciona marcadores para cada animal com coordenadas válidas
      animais.forEach(animal => {
        // Correção: Adiciona verificação para garantir que latitude e longitude existam
        if (animal && animal.latitude && animal.longitude) {
          L.marker([animal.latitude, animal.longitude])
            .addTo(map)
            .bindPopup(`
              <strong>${animal.nome || 'Nome Indisponível'}</strong><br>
              ${animal.especie || 'Espécie Indisponível'}<br>
              Desaparecido em: ${new Date(animal.dataDesaparecimento).toLocaleDateString()}
            `);
        }
      });
      
      // Limpeza: remove o mapa ao desmontar o componente
      return () => {
        map.remove();
      };
    }
  }, [loading, animais, userLocation]);

  // Depuração: mostrar array de animais sempre que o componente renderizar com novos dados
  console.log('Animais renderizados:', animais);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando animais desaparecidos...</p>
      </div>
    );
  }

  return (
    <div className="missing-home-container">
      <div className="header-section">
        <h1>Animais Desaparecidos na Sua Região</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-report"
        >
          <i className="icon-plus"></i> Reportar Desaparecimento
        </button>
      </div>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)} />
            <MissingForm 
              // Cadastro agora é feito direto no Supabase pelo MissingForm
            />
          </div>
        </div>
      )}

      <div className="map-section">
        <div className="map-container">
          <div id="map-container" style={{ height: '400px', borderRadius: '8px' }}></div>
          <div className="map-legend">
            <span><div className="legend-icon"></div> Localização de animais desaparecidos</span>
          </div>
        </div>
      </div>

      <div className="animal-list-section">
        <h2>Últimos Animais Reportados</h2>
        {animais.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum animal desaparecido reportado na sua região ainda.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-report"
            >
              Seja o primeiro a reportar
            </button>
          </div>
        ) : (
          <div className="animal-cards-grid">
            {animais.map(animal => (
              <MissingCard 
                key={animal.id}
                animal={animal}
                onInfoClick={a => alert(`Informações de contato: ${a.contato}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissingHomePage;