import PokemonCard from "@/components/PokemonCard";
import { IPokemon } from "@/interfaces/IPokemon";
import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchPokemonList = async () => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Accesso non autorizzato.");

        const response = await fetch("http://localhost:8000/api/v1/pokemon", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Errore nel caricamento dei Pokémon.");
        }

        return await response.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPokemonList();
                setPokemonList(data);
            } catch (error: any) {
                console.error("Errore:", error);
                if (error.message === "Accesso non autorizzato.") {
                    alert("Accesso non autorizzato. Effettua il login.");
                    navigate("/login");
                } else {
                    setErrorMessage("Impossibile recuperare la lista dei Pokémon.");
                }
            }
        };

        fetchData();
    }, [navigate]);

    const renderList = () => {
        if (errorMessage) {
            return <p className="text-red-500">{errorMessage}</p>;
        }

        return pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => (
                <Fragment key={pokemon.nationalNumber}>
                    <PokemonCard {...pokemon} />
                </Fragment>
            ))
        ) : (
            <p>No Pokémon found.</p>
        );
    };

    return (
        <div className="flex flex-wrap w-full justify-center gap-3 mt-6">
            {renderList()}
        </div>
    );
};

export default PokemonList;
