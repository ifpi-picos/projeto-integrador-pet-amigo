import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";

function AddressForm({ onSubmit, prevStep, loading, updateFormData, formData }) {
    const [addressData, setAddressData] = useState({
        cep: formData.cep || '',
        street: formData.street || '',
        city: formData.city || '',
        state: formData.state || '',
        phone: formData.phone || ''
    });
    const [loadingCep, setLoadingCep] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevData => ({ ...prevData, [name]: value }));
    };
    
    // Lógica do ViaCEP permanece igual
    const handleCepBlur = async (e) => { /* ... */ };
    
    // CORREÇÃO: Lógica de submissão ajustada
    const handleSubmit = (e) => {
        e.preventDefault();
        // 1. Atualiza o estado do pai com os dados finais deste formulário
        updateFormData(addressData);
        // 2. Chama a função de submissão final do pai
        onSubmit(); 
    };

    return (
        <div className="auth-form-container">
            <h1>Onde encontrar você?</h1>
            <p>Essas informações são importantes para o processo de adoção.</p>
            <form onSubmit={handleSubmit} className="profile-form">
                <input type="text" name="cep" placeholder="CEP" value={addressData.cep} onChange={handleChange} onBlur={handleCepBlur} required className="form-input" />
                <input type="text" name="street" placeholder="Endereço (Rua, Av.)" value={addressData.street} onChange={handleChange} required className="form-input" />
                <input type="text" name="city" placeholder="Cidade" value={addressData.city} onChange={handleChange} required className="form-input" />
                <input type="text" name="state" placeholder="Estado (UF)" value={addressData.state} onChange={handleChange} required className="form-input" />
                <input type="tel" name="phone" placeholder="Telefone / WhatsApp" value={addressData.phone} onChange={handleChange} required className="form-input" />
                
                {loadingCep && <p>Buscando endereço...</p>}

                <div className="form-navigation">
                    <button type="button" onClick={prevStep} className="prev-button" disabled={loading}><FaArrowLeft /></button>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Finalizar Cadastro'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;