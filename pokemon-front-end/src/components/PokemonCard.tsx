import { PlusCircle, Heart } from "lucide-react";
import { Card } from "./ui/card";
import { IPokemon } from "@/interfaces/IPokemon";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const PokemonCard = ({
    englishName,
    nationalNumber,
    primaryType,
    secondaryType,
}: IPokemon) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isAddingToPokedex, setIsAddingToPokedex] = useState(false);
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

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

    const handleAddToPokedex = async () => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Vuoi aggiungere questo Pokémon al tuo Pokedex?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sì",
            cancelButtonText: "Annulla",
        });

        if (!result.isConfirmed) return;

        setIsAddingToPokedex(true);

        const userId = getUserIdFromToken();
        if (!userId) {
            alert("Errore: Non autenticato");
            setIsAddingToPokedex(false);
            return;
        }

        const pokemonData = {
            idUser: userId,
            nationalNumber,
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
                Swal.fire("Successo!", "Pokémon aggiunto al Pokedex!", "success");
            } else {
                const error = await response.text();
                Swal.fire("Errore", `Errore: ${error}`, "error");
            }
        } catch (error) {
            console.error("Errore durante l'aggiunta al Pokedex:", error);
            Swal.fire("Errore", "Errore durante l'aggiunta al Pokedex.", "error");
        } finally {
            setIsAddingToPokedex(false);
        }
    };

    const handleAddToWishlist = async () => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Vuoi aggiungere questo Pokémon alla tua Wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sì",
            cancelButtonText: "Annulla",
        });

        if (!result.isConfirmed) return;

        setIsAddingToWishlist(true);

        const userId = getUserIdFromToken();
        if (!userId) {
            alert("Errore: Non autenticato");
            setIsAddingToWishlist(false);
            return;
        }

        const pokemonData = {
            idUser: userId,
            nationalNumber,
        };

        try {
            const response = await fetch("http://localhost:8000/api/v1/wishlist/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify(pokemonData),
            });

            if (response.ok) {
                Swal.fire("Successo!", "Pokémon aggiunto alla Wishlist!", "success");
            } else {
                const error = await response.text();
                Swal.fire("Errore", `Errore: ${error}`, "error");
            }
        } catch (error) {
            console.error("Errore durante l'aggiunta alla Wishlist:", error);
            Swal.fire("Errore", "Errore durante l'aggiunta alla Wishlist.", "error");
        } finally {
            setIsAddingToWishlist(false);
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
            >
                {/* Immagine */}
                <div className="w-full h-32 flex items-center justify-center mb-6">
                    <img
                        src={`images/${englishName.toLowerCase()}.avif`}
                        alt={englishName}
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
                        {englishName}
                    </h2>
                    <p className="text-lg text-red-500 font-semibold text-muted-foreground" style={{ fontFamily:'Unbounded, sans-serif' }}>#{nationalNumber}</p>
                    <p className="text-xs font-normal text-muted-foreground" style={{ fontFamily:'Unbounded, sans-serif' }}>
                        {primaryType}
                        {secondaryType && `, ${secondaryType}`}
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
                    title="Aggiungi al Pokedex"
                    onClick={handleAddToPokedex}
                    disabled={isAddingToPokedex}
                >
                    <PlusCircle className="text-lg text-black" />
                </button>
                <button
                    className="w-12 h-12 rounded-full bg-white shadow-md border-2 border-gray-200 flex items-center justify-center hover:border-red-500 transition-all duration-300"
                    title="Aggiungi alla Wishlist"
                    onClick={handleAddToWishlist}
                    disabled={isAddingToWishlist}
                >
                    <Heart className="text-lg text-black" />
                </button>
            </div>
        </div>
    );
};

export default PokemonCard;
