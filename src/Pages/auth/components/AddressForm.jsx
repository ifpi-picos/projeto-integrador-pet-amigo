import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";

function AddressForm({ onSubmit, prevStep, loading, updateFormData }) { // Adicionado updateFormData
    const [addressData, setAddressData] = useState({
        cep: '',
        street: '',
        city: '',
        state: '',
        phone: ''
    });
    const [loadingCep, setLoadingCep] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleCepBlur = async (e) => { 
        const cepValue = e.target.value.replace(/\D/g, '');
        if (cepValue.length === 8) {
            setLoadingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    const newAddressData = {
                        ...addressData,
                        street: data.logradouro,
                        city: data.localidade,
                        state: data.uf
                    };
                    setAddressData(newAddressData);
                    updateFormData(newAddressData); // Atualiza o estado pai também
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            } finally {
                setLoadingCep(false);
            }
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // A função updateFormData já foi chamada no onBlur do CEP e no handleChange.
        // O estado do pai (Auth.jsx) já está atualizado.
        // A prop onSubmit agora é a handleFinalSubmit do pai.
        onSubmit(); 
    };

    return (
        <div className="auth-form-container">
            <h1>Onde encontrar você?</h1>
            <p>Essas informações são importantes para o processo de adoção.</p>
            <form onSubmit={handleSubmit} className="profile-form">
                {/* CORREÇÃO: 'name' dos inputs e 'value' em inglês */}
                <input type="text" name="cep" placeholder="CEP" onChange={handleChange} onBlur={handleCepBlur} required className="form-input" />
                <input type="text" name="street" placeholder="Endereço (Rua, Av.)" value={addressData.street} onChange={handleChange} required className="form-input" />
                <input type="text" name="city" placeholder="Cidade" value={addressData.city} onChange={handleChange} required className="form-input" />
                <input type="text" name="state" placeholder="Estado (UF)" value={addressData.state} onChange={handleChange} required className="form-input" />
                <input type="tel" name="phone" placeholder="Telefone / WhatsApp" onChange={handleChange} required className="form-input" />
                
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