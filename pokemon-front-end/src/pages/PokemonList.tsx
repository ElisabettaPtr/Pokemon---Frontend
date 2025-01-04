import PokemonCard from "@/components/PokemonCard";
import { IPokemon } from "@/interfaces/IPokemon";
import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

interface PokemonListProps {
  fetchFunction: () => Promise<any>; // Funzione di fetch passata come prop
}

const PokemonList: React.FC<PokemonListProps> = ({ fetchFunction }) => {
    const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Accesso non autorizzato. Effettua il login.");
            navigate("/login");
            return;
        }

        try {
            const data = await fetchFunction();
            setPokemonList(data);
        } catch (error) {
            console.error("Errore:", error);
            setErrorMessage("Impossibile recuperare la lista dei Pokémon.");
        }
        };

        fetchData();
    }, [fetchFunction, navigate]);

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
