import IPokemon from "@/interfaces/IPokemon";
import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/pokemon")
            .then((response) => response.json())
            .then((pokemonData) => {
                setPokemonList(pokemonData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderList = () => {
        return pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => {
                return (
                    <Fragment key={pokemon.nationalNumber}>
                        <PokemonCard {...pokemon} />
                    </Fragment>
                );
            })
        ) : (
            <p>No Pokémon</p>
        );
    };

    return (
        <div className="grid grid-cols-6 gap-3 p-4">
            {renderList()}
        </div>
    )
}

export default PokemonList;
