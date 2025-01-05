import { IWishlistData } from "@/interfaces/IWishlistData";
import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import WishlistCard from "@/components/WishlistCard";

const PersonalWishlist = () => {
    const [pokemonList, setPokemonList] = useState<IWishlistData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchWishlistList = async () => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Accesso non autorizzato.");
        
        const response = await fetch("http://localhost:8000/api/v1/wishlist", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Sessione scaduta. Effettua nuovamente il login.");
            } else {
                throw new Error("Errore nel caricamento del Wishlist.");
            }
        }
        
        const wishlistList = await response.json();
        const mappedPokemonList = wishlistList.map((entry: IWishlistData) => ({
                pokemon: {
                    nationalNumber: entry.pokemon.nationalNumber,
                    englishName: entry.pokemon.englishName,
                    primaryType: entry.pokemon.primaryType,
                    secondaryType: entry.pokemon.secondaryType
                },
                idWishlist: entry.idWishlist
            }));
        return mappedPokemonList;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWishlistList();
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
                <Fragment key={pokemon.idWishlist}>
                    <WishlistCard pokemonData={pokemon} />
                </Fragment>
            ))
        ) : (
            <p>No Pokémon found.</p>
        );
    };

    return (
        <div className="mt-[64px]">
            <h1
                className="text-4xl font-extrabold text-yellow-400 text-center"
                style={{
                    fontFamily: "Lattolatoo, sans-serif",
                    fontWeight: "bolder",
                    color: "#ffde00",
                    textShadow:
                        "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                    marginBottom: "0.5rem",
                }}
            >
                Wishlist Personale
            </h1>
            <h2
                className="text-2xl font-semibold text-gray-200 text-center"
                style={{
                    fontFamily: "Lattolatoo, sans-serif",
                    fontWeight: "normal",
                    color: "#cccccc",
                    textShadow:
                        "1px 0 #3b4cca, -1px 0 #3b4cca, 0 1px #3b4cca, 0 -1px #3b4cca",
                    marginBottom: "1.5rem",
                }}
            >
                Aggiungi i Pokémon che vorresti catturare
            </h2>
            <div className="flex flex-wrap w-full justify-center gap-3 mt-6">
                {renderList()}
            </div>
        </div>
    );
};

export default PersonalWishlist;