import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Importe useNavigate
import { supabase } from '../../../supabaseClient.js'; // Importe seu cliente Supabase

// Importe os ícones que você está usando
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function LoginForm({ onSwitchToRegister }) {
    // 2. Crie estados para os campos do formulário, carregamento e erros
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    // 3. Função para lidar com o login com email e senha
    const handleLogin = async (e) => {
        e.preventDefault(); // Impede que a página recarregue ao enviar o formulário
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message); // Define a mensagem de erro se o login falhar
        } else {
            // Se o login for bem-sucedido, o onAuthStateChange (do seu AuthContext)
            // irá detectar a nova sessão, e nós navegamos para a home.
            navigate('/home');
        }

        setLoading(false);
    };

    // 4. Função para lidar com o login social (Google)
    const handleGoogleLogin = async () => {
        setError('');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-form-container">
            <h1>Bem-vindo(a)!</h1>
            <p className="form-subtitle">Entre na sua conta para continuar.</p>
            
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="login-email" className="visually-hidden">Endereço de e-mail</label>
                    <MdEmail className="input-icon" />
                    <input 
                        id="login-email"
                        name="email"
                        type="email" 
                        placeholder="Endereço de e-mail"
                        value={email} // Conecta o valor ao estado
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="login-password" className="visually-hidden">Senha</label>
                    <FaLock className="input-icon" />
                    <input 
                        id="login-password"
                        name="password"
                        type="password" 
                        placeholder="Senha" 
                        value={password} // Conecta o valor ao estado
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>

                {/* Exibe a mensagem de erro, se houver */}
                {error && <p className="error-message">{error}</p>}

                <div className="form-options">
                    <Link to="/esqueci-minha-senha" className="forgot-password-link">
                        Esqueci minha senha
                    </Link>
                </div>

                {/* O botão fica desabilitado e muda o texto durante o carregamento */}
                <button type="submit" className="primary-button" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="form-divider">
                    <hr />
                    <span>ou</span>
                    <hr />
                </div>
                
                <button type="button" className="social-button" onClick={handleGoogleLogin}>
                    <FcGoogle />
                    Entrar com Google
                </button>
            </form>

            <p className="switch-view-text">
                Não tem uma conta? 
                <button onClick={onSwitchToRegister} className="switch-view-button">
                    Cadastre-se
                </button>
            </p>
        </div>
    );
}

export default LoginForm;