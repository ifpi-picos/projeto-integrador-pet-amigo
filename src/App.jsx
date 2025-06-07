import React from 'react';
import Navbar from './Components/NavBar/navbar.jsx';
import AppRoutes from './routes/router.jsx'; // 1. Importe seu componente de rotas
import './App.css'; // 2. Opcional: crie um App.css para o layout principal

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;