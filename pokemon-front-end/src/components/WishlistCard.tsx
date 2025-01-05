import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightToLine, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Card } from "./ui/card";
import { IWishlistData } from "@/interfaces/IWishlistData";
import { jwtDecode } from "jwt-decode";

interface WishlistCardProps {
    pokemonData: IWishlistData;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ pokemonData }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRemovingFromWishlist, setIsRemovingFromWishlist] = useState(false);
    const [isMovingToPokedex, setIsMovingToPokedex] = useState(false);
    const navigate = useNavigate();

    const { pokemon, idWishlist } = pokemonData;

    const handleCardClick = () => {
        navigate(`/pokemon-detail/${pokemon.nationalNumber}`);
    };

    const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    const getUserIdFromToken = () => {
        const token = getAuthToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                return decoded.sub;
            } catch (error) {
                console.error("Errore nel decodificare il token", error);
                return null;
            }
        }
        return null;
    };

    const handleRemoveFromWishlist = async () => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Vuoi rimuovere questo Pokémon dalla tua Wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sì",
            cancelButtonText: "Annulla",
        });

        if (!result.isConfirmed) return;

        setIsRemovingFromWishlist(true);

        // Logica per rimuovere dalla Wishlist
        try {
            const response = await fetch(`http://localhost:8000/api/v1/wishlist/delete/${idWishlist}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({ idWishlist }),
            });

            if (response.ok) {
                Swal.fire("Successo!", "Pokémon rimosso dalla Wishlist!", "success");
            } else {
                const error = await response.text();
                Swal.fire("Errore", `Errore: ${error}`, "error");
            }
        } catch (error) {
            console.error("Errore durante la rimozione dalla Wishlist:", error);
            Swal.fire("Errore", "Errore durante la rimozione dalla Wishlist.", "error");
        } finally {
            setIsRemovingFromWishlist(false);
        }
    };

    const handleMoveToPokedex = async () => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Vuoi spostare questo Pokémon nel tuo Pokedex?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sì",
            cancelButtonText: "Annulla",
        });

        if (!result.isConfirmed) return;

        setIsMovingToPokedex(true);
        

        // Logica per spostare nella Wishlist
        try {
            const response = await fetch(`http://localhost:8000/api/v1/wishlist/delete/${idWishlist}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({ idWishlist }),
            });
            if(response.ok) {
                const userId = getUserIdFromToken();
                if (!userId) {
                    alert("Errore: Non autenticato");
                    setIsMovingToPokedex(false);
                    return;
                }
        
                const pokemonData = {
                    idUser: userId,
                    nationalNumber: pokemon.nationalNumber,
                };
        
                try {
                    const response = await fetch("http://localhost:8000/api/v1/pokedex/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getAuthToken()}`,
                        },
                        body: JSON.stringify(pokemonData),
                    });
        
                    if (response.ok) {
                        Swal.fire("Successo!", "Pokémon spostato nel Pokedex!", "success");
                    } else {
                        const error = await response.text();
                        Swal.fire("Errore", `Errore: ${error}`, "error");
                    }
                } catch (error) {
                    console.error("Errore durante lo spostamento nel Pokedex:", error);
                    Swal.fire("Errore", "Errore durante lo spostamento nel Pokedex.", "error");
                } finally {
                    setIsMovingToPokedex(false);
                }
            }
        } catch (error) {
            console.error("Errore durante lo spostamento nel Pokedex:", error);
            Swal.fire("Errore", "Errore durante lo spostamento nel Pokedex.", "error");
        }
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card */}
            <Card
                className={`relative mb-6 text-center min-w-44 min-h-60 bg-white rounded-lg p-4 shadow-md border-2 transition-all duration-300 ${
                    isHovered ? "border-red-400" : "border-white"
                } overflow-hidden`}
                onClick={handleCardClick}
            >
                {/* Immagine */}
                <div className="w-full h-32 flex items-center justify-center mb-6">
                    <img
                        src={`images/${pokemon.englishName.toLowerCase().replace(" ", "")}.avif`}
                        alt={pokemon.englishName}
                        className="object-contain max-h-full"
                    />
                </div>

                {/* Contenuti */}
                <div className="flex flex-col mb-3">
                    <h2
                        className="text-3xl font-bold text-yellow-400"
                        style={{
                            fontFamily: "Lattolatoo, sans-serif",
                            fontWeight: "bolder",
                            color: "#ffde00",
                            textShadow:
                                "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                        }}
                    >
                        {pokemon.englishName}
                    </h2>
                    <p className="text-lg text-red-500 font-semibold text-muted-foreground" style={{ fontFamily:'Unbounded, sans-serif' }}>#{pokemon.nationalNumber}</p>
                    <p className="text-xs font-normal text-muted-foreground" style={{ fontFamily:'Unbounded, sans-serif' }}>
                        {pokemon.primaryType}
                        {pokemon.secondaryType && `, ${pokemon.secondaryType}`}
                    </p>
                </div>
            </Card>

            {/* Bottoni */}
            <div
                className={`absolute left-1/2 bottom-[-0px] transform -translate-x-1/2 flex gap-10 transition-opacity duration-300 ${
                    isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <button
                    className="w-12 h-12 rounded-full bg-white shadow-md border-2 border-gray-200 flex items-center justify-center hover:border-red-500 transition-all duration-300"
                    title="Rimuovi dalla Wishlist"
                    onClick={handleRemoveFromWishlist}
                    disabled={isRemovingFromWishlist}
                >
                    <Trash2 className="text-lg text-black" />
                </button>
                <button
                    className="w-12 h-12 rounded-full bg-white shadow-md border-2 border-gray-200 flex items-center justify-center hover:border-red-500 transition-all duration-300"
                    title="Sposta nel Pokedex"
                    onClick={handleMoveToPokedex}
                    disabled={isMovingToPokedex}
                >
                    <ArrowRightToLine className="text-lg text-black" />
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
