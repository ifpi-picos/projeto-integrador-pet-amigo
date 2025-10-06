import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function AdminRoute({ children }) {
    const { profile, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>; // Ou um spinner
    }

    if (!profile || profile.role !== 'admin') {
        // Se não estiver logado ou não for admin, redireciona para a home
        return <Navigate to="/home" replace />;
    }

    return children; // Se for admin, renderiza a página do painel
}

export default AdminRoute;