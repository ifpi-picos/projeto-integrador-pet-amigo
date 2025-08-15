import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function OngForm({ nextStep, prevStep, updateFormData }) {
    const [ongData, setOngData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        ong_name: '',
        cnpj: '',
        responsible_name: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOngData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (ongData.password !== ongData.confirm_password) {
            alert("As senhas não coincidem.");
            return;
        }
        if (ongData.password.length < 6) {
            alert("A senha precisa ter no mínimo 6 caracteres.");
            return;
        }
        updateFormData(ongData);
        nextStep();
    };

    return (
        <div className="auth-form-container">
            <h1>Sobre sua ONG</h1>
            <p className="form-subtitle">Crie as credenciais e as informações da sua organização.</p>
            <form onSubmit={handleNext} className="profile-form">
                <input type="text" name="ong_name" placeholder="Nome da ONG" onChange={handleChange} className="form-input" required />
                <input type="text" name="responsible_name" placeholder="Nome do Responsável" onChange={handleChange} className="form-input" required />
                <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} className="form-input" required />
                <input type="email" name="email" placeholder="E-mail da ONG" onChange={handleChange} className="form-input" required />
                
                <div className='input-with-icon-group'>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        className="form-input" 
                        placeholder="Crie uma senha forte" 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="input-icon-button">
                        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </button>
                </div>

                <input 
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    className="form-input" 
                    placeholder="Confirme sua senha" 
                    onChange={handleChange}     
                    required 
                />
                <p className="input-hint">A senha deve ter no mínimo 6 caracteres.</p>
                
                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button"><FaArrowLeft /></button>
                    <button type="submit" className="next-button">Próximo</button>
                </div>
            </form>
        </div>
    );
}

export default OngForm;