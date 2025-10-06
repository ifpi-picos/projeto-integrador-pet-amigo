import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../supabaseClient';
import { Link } from 'react-router-dom';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const { data: userProfiles, error: userError } = await supabase.from('user_profiles').select('*');
            if (userError) throw userError;

            const { data: ongProfiles, error: ongError } = await supabase.from('ong_profiles').select('*');
            if (ongError) throw ongError;

            const allUsers = [
                ...userProfiles.map(p => ({ ...p, type: 'Pessoa' })),
                ...ongProfiles.map(p => ({ ...p, type: 'ONG' }))
            ].sort((a, b) => (a.display_name || a.ong_name).localeCompare(b.display_name || b.ong_name));
            
            setUsers(allUsers);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Tem certeza que deseja deletar o usuário ${userName}? Esta ação é irreversível.`)) {
            const { error: rpcError } = await supabase.rpc('delete_user', {
                user_id_to_delete: userId
            });
            if (rpcError) {
                alert(`Erro ao deletar: ${rpcError.message}`);
            } else {
                alert("Usuário deletado com sucesso.");
                fetchUsers(); // Re-busca os usuários para atualizar a lista
            }
        }
    };

    const handlePromote = async (userId, newRole, userType) => {
        const tableName = userType === 'Pessoa' ? 'user_profiles' : 'ong_profiles';
        const { error: updateError } = await supabase
            .from(tableName)
            .update({ role: newRole })
            .eq('id', userId);
        
        if (updateError) {
            alert(`Erro ao promover: ${updateError.message}`);
        } else {
            alert("Cargo do usuário atualizado com sucesso.");
            fetchUsers(); // Re-busca os usuários para atualizar a lista
        }
    };

    const filteredUsers = users.filter(user => 
        (user.display_name || user.ong_name)?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="users-table-container">
            <input 
                type="text" 
                placeholder="Buscar usuário por nome..." 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input"
            />
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="4">Carregando usuários...</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td><Link to={`/profile/${user.id}`}>{user.display_name || user.ong_name}</Link></td>
                                <td>{user.type}</td>
                                <td>
                                    <select
                                        className="role-select"
                                        value={user.role}
                                        onChange={e => handlePromote(user.id, e.target.value, user.type)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="actions-cell">
                                    <button 
                                        onClick={() => handleDelete(user.id, user.display_name || user.ong_name)} 
                                        className="delete-btn"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;