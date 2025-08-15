import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função centralizada para buscar o perfil correto
    const fetchProfile = async (userId) => {
        if (!userId) return null;
        
        const { data: userProfile } = await supabase.from('user_profiles').select('*').eq('id', userId).single();
        if (userProfile) return { ...userProfile, user_type: 'PESSOA' };

        const { data: ongProfile } = await supabase.from('ong_profiles').select('*').eq('id', userId).single();
        if (ongProfile) return { ...ongProfile, user_type: 'ONG' };
        
        return null;
    };

    useEffect(() => {
        // Esta função agora lida com TUDO: carregamento inicial e mudanças de estado
        const setupAuthListener = async () => {
            // 1. Pega a sessão inicial. ESSENCIAL para o refresh da página.
            const { data: { session } } = await supabase.auth.getSession();
            const initialUser = session?.user;
            
            if (initialUser) {
                setUser(initialUser);
                const initialProfile = await fetchProfile(initialUser.id);
                setProfile(initialProfile);
            }
            
            // 2. Só depois de verificar a sessão inicial, finalizamos o loading.
            setLoading(false);

            // 3. Agora, escutamos por MUDANÇAS (login/logout) que aconteçam DEPOIS.
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (_event, session) => {
                    const currentUser = session?.user;
                    setUser(currentUser ?? null);
                    
                    if (currentUser) {
                        const profileData = await fetchProfile(currentUser.id);
                        setProfile(profileData);
                    } else {
                        setProfile(null);
                    }
                }
            );

            return () => {
                subscription?.unsubscribe();
            };
        };

        const subscription = setupAuthListener();

        return () => {
            // Limpa a inscrição quando o componente é desmontado
            (async () => {
                (await subscription)?.();
            })();
        };
    }, []);

    const value = {
        user,
        profile,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}