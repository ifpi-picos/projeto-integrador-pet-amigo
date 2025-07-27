import React, { useState } from "react";
import "./auth.css";
import { supabase } from '../../supabaseClient';
import LoginForm from "./components/LoginForm.jsx";
import SelectUserType from "./components/SelectUserType.jsx";
import PersonForm from "./components/PersonForm.jsx";
import OngForm from "./components/OngForm.jsx";
import AddressForm from "./components/AddressForm.jsx";
import SuccessMessage from "./components/SuccessMessage.jsx";
import LoginDog from "../../assets/login-dog.png";
import Logo from "@/assets/logo.png";

function Auth() {
    const [view, setView] = useState('login');
    const [registerStep, setRegisterStep] = useState(1);
    const [formData, setFormData] = useState({
        user_type: '', 
        email: '',  
        password: '', 
        nome_completo: '', 
        nome_exibicao: '',
        cpf: '', 
        data_nascimento: '', 
        nome_ong: '', 
        cnpj: '', 
        nome_responsavel: '', 
        telefone: '', 
        cep: '', 
        endereco: '', 
        cidade: '', 
        estado: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const updateFormData = (data) => {
        setFormData(prevData => ({ ...prevData, ...data }));
    };

    const nextStep = () => setRegisterStep(prevStep => prevStep + 1);
    const prevStep = () => setRegisterStep(prevStep => prevStep - 1);
    
    const switchToRegister = () => setView('register');
    const switchToLogin = () => {
        setView('login');
        setRegisterStep(1);
        setError('');
    };

    const handleFinalSubmit = async (addressData) => {
        setLoading(true);
        setError('');
    
        // 1. Junta todos os dados do formulário em um objeto final
        const finalData = { ...formData, ...addressData };
    
        // 2. Separa a senha (que não vai nos metadados) do resto dos dados
        const { password, ...optionsData } = finalData;
        
        // 3. Cadastra o usuário e passa TODOS os outros dados no campo 'options.data'
        // O trigger no Supabase vai pegar esses dados e fazer o INSERT completo.
        const { data, error } = await supabase.auth.signUp({
            email: finalData.email.trim(),
            password: password,
            options: {
                data: optionsData 
            }
        });
    
        setLoading(false);
    
        if (error) {
            setError(error.message);
        } else if (data.user) {
            // Se o signUp deu certo, o trigger já fez todo o trabalho.
            // A chamada .update() foi removida. Apenas avançamos para a tela de sucesso!
            nextStep(); 
        } else {
             setError("Ocorreu um erro desconhecido durante o cadastro.");
        }
    };

    // Função que renderiza o componente da etapa de cadastro correta
    const renderRegisterStep = () => {
        const props = { nextStep, prevStep, updateFormData, error, loading };

        switch (registerStep) {
            case 1:
                return <SelectUserType {...props} onSwitchToLogin={switchToLogin} />;
            case 2:
                if (formData.user_type === 'PESSOA') {
                    return <PersonForm {...props} />;
                } else if (formData.user_type === 'ONG') {
                    return <OngForm {...props} />;
                }
                return null;
            case 3:
                return <AddressForm {...props} onSubmit={handleFinalSubmit} />;
            case 4:
                return <SuccessMessage switchToLogin={switchToLogin} />;
            default:
                return <SelectUserType {...props} onSwitchToLogin={switchToLogin} />;
        }
    };

    return (
        <div className="auth-container"> 
            <section className="auth-content">
                <div className="auth-logo">
                    <img src={Logo} alt="Logo" />
                    <h1>Pet Amigo</h1>
                </div>
                <div className="auth-form">
                    {view === 'login' ? (
                        <LoginForm onSwitchToRegister={switchToRegister} />
                    ) : (
                        renderRegisterStep()
                    )}
                </div>
            </section>
            <img 
                src={LoginDog} 
                className="auth-image" 
                alt="Cachorro ilustrativo"
            />
        </div>
    );
}
    
export default Auth;