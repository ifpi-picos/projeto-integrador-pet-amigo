// src/components/CadastroAnimal.jsx

import React, { useState, useEffect } from "react";
import "./CadastroAnimal.css";
import { supabase } from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";

const speciesMap = {
  "cachorro": "dog",
  "gato": "cat",
  "outro": "other",
};

const CadastroAnimal = () => {
    const [animal, setAnimal] = useState({
        name: "", description: "", age: "", species: "", race: "", location: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserAndCreateProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);

                // CORREÇÃO: Usa upsert para garantir que o perfil do dono exista
                const { error: upsertError } = await supabase
                    .from('owners')
                    .upsert([{ user_auth_id: user.id }], { onConflict: 'user_auth_id' });
                
                if (upsertError) {
                    console.error('Erro ao criar/atualizar o perfil do dono:', upsertError.message);
                }
            }
        };
        fetchUserAndCreateProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimal((prevAnimal) => ({
            ...prevAnimal,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!selectedFile) {
                throw new Error("Por favor, selecione uma foto para o animal.");
            }
            if (!userId) {
                throw new Error("Você precisa estar logado para cadastrar um animal.");
            }

            const fileExtension = selectedFile.name.split(".").pop();
            const fileName = `${uuidv4()}.${fileExtension}`;
            const filePath = `animais/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("assets-db")
                .upload(filePath, selectedFile);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("assets-db")
                .getPublicUrl(filePath);

            if (!publicUrl) {
                throw new Error("Erro ao obter a URL da imagem.");
            }

            const speciesValue = speciesMap[animal.species.toLowerCase()] || animal.species.toLowerCase();
            
            const { data: newAnimal, error: animalError } = await supabase
                .from("animals")
                .insert([
                    {
                        name: animal.name,
                        description: animal.description,
                        age: animal.age,
                        species: speciesValue,
                        breed: animal.race,
                        location: animal.location,
                        owner_id: userId,
                    },
                ])
                .select();

            if (animalError) {
                throw animalError;
            }

            const newAnimalId = newAnimal[0].id;
            const { error: photoError } = await supabase.from("pet_photos").insert([
                {
                    pet_id: newAnimalId,
                    url: publicUrl,
                    is_cover: true,
                },
            ]);

            if (photoError) {
                throw photoError;
            }

            setSuccess(true);
            setAnimal({
                name: "", description: "", age: "", species: "", race: "", location: "",
            });
            setSelectedFile(null);
        } catch (error) {
            setError(error.message);
            console.error("Erro no cadastro:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cadastro-page-container">
            <div className="cadastro-content">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h1 className="form-title">🐾 Adote um Amigo</h1>
                        <p>Preencha os dados abaixo para cadastrar um animal e ajudá-lo a encontrar um novo lar. ✨</p>
                    </div>
                    <form onSubmit={handleSubmit} className="cadastro-form">
                        <div className="form-group full-width">
                            <label htmlFor="name">Nome do Animal</label>
                            <input type="text" id="name" name="name" value={animal.name} onChange={handleInputChange} required placeholder="Ex: Thor, Mel, Luna..." />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" name="description" value={animal.description} onChange={handleInputChange} rows="4" placeholder="Conte um pouco sobre o animal, personalidade, cuidados, etc." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Idade (anos)</label>
                            <input type="number" id="age" name="age" value={animal.age} onChange={handleInputChange} min="0" placeholder="Ex: 2" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="species">Espécie</label>
                            <input type="text" id="species" name="species" value={animal.species} onChange={handleInputChange} placeholder="Ex: Cachorro, Gato..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="race">Raça</label>
                            <input type="text" id="race" name="race" value={animal.race} onChange={handleInputChange} placeholder="Ex: SRD, Poodle, Siamês..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Localização (Cidade/Estado)</label>
                            <input type="text" id="location" name="location" value={animal.location} onChange={handleInputChange} placeholder="Ex: Picos/PI" />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="photo">Foto do Animal</label>
                            <div className="file-input-wrapper">
                                <span className="file-input-label">Escolher Arquivo</span>
                                <span className="file-name">{selectedFile ? selectedFile.name : "Nenhum escolhido"}</span>
                                <input type="file" id="photo" name="photo" onChange={handleFileChange} accept="image/*" required className="file-input" />
                            </div>
                        </div>
                        <div className="submit-group full-width">
                            <button
                                type="submit"
                                disabled={loading || !userId}
                                className="submit-button"
                            >
                                {loading ? "Cadastrando..." : "Cadastrar Animal"}
                            </button>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">Animal cadastrado com sucesso! 🎉</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroAnimal;