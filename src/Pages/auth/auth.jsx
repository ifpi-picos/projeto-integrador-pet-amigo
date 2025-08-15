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
    
    // CORRIGIDO: Nomes do estado padronizados para o inglês
    const [formData, setFormData] = useState({
        user_type: '',
        email: '',
        password: '',
        display_name: '',
        full_name: '',
        cpf: '',
        birth_date: '',
        ong_name: '',
        cnpj: '',
        responsible_name: '',
        phone: '',
        cep: '',
        street: '',
        city: '',
        state: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const updateFormData = (data) => setFormData(prevData => ({ ...prevData, ...data }));
    const nextStep = () => setRegisterStep(prevStep => prevStep + 1);
    const prevStep = () => setRegisterStep(prevStep => prevStep - 1);
    const switchToRegister = () => setView('register');
    const switchToLogin = () => {
        setView('login');
        setRegisterStep(1);
        setError('');
    };
    
    // CORRIGIDO: Lógica de submit para enviar metadados corretos
    const handleFinalSubmit = async (addressData) => {
        setLoading(true);
        setError('');
    
        const finalData = { ...formData, ...addressData };
        
        const metadata = {
            user_type: finalData.user_type,
            display_name: finalData.display_name,
            full_name: finalData.full_name,
            cpf: finalData.cpf,
            birth_date: finalData.birth_date,
            ong_name: finalData.ong_name,
            cnpj: finalData.cnpj,
            responsible_name: finalData.responsible_name,
            phone: finalData.phone,
            cep: finalData.cep,
            street: finalData.street,
            city: finalData.city,
            state: finalData.state
        };
        
        const { data, error } = await supabase.auth.signUp({
            email: finalData.email.trim(),
            password: finalData.password,
            options: {
                data: metadata
            }
        });
    
        setLoading(false);
    
        if (error) {
            setError(error.message);
        } else if (data.user) {
            nextStep();
        } else {
            setError("Ocorreu um erro desconhecido durante o cadastro.");
        }
    };

    const renderRegisterStep = () => {
        const props = { nextStep, prevStep, updateFormData, formData, error, loading };

        switch (registerStep) {
            case 1:
                return <SelectUserType {...props} onSwitchToLogin={switchToLogin} />;
            case 2:
                if (formData.user_type === 'PESSOA') return <PersonForm {...props} />;
                if (formData.user_type === 'ONG') return <OngForm {...props} />;
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
            <img src={LoginDog} className="auth-image" alt="Cachorro ilustrativo" />
        </div>
    );
}
    
export default Auth;