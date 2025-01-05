import { IPokemon } from "@/interfaces/IPokemon";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProgressBar = ({ value, max }: { value: number; max: number }) => (
    <progress className="progress progress-warning w-full" value={value} max={max}></progress>
);

const PokemonDetail = () => {
    const { nationalNumber } = useParams<{ nationalNumber: string }>(); // Ottieni il parametro dalla rotta
    const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!nationalNumber) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Accesso non autorizzato.");

                const response = await fetch(
                    `http://localhost:8000/api/v1/pokemon/national-number/${nationalNumber}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data: IPokemon = await response.json();
                    setPokemonData(data);
                } else {
                    console.error("Errore nel recupero dei dati del Pokémon.");
                }
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };

        fetchPokemon();
    }, [nationalNumber]);

    if (!pokemonData) {
        return <p>Caricamento in corso...</p>;
    }

    return (
        <div className="text-center w-full bg-white mt-8 h-auto p-10 space-y-6">
            {/* Contenitore principale */}
            <div className="md:flex mb-6 p-6">
                {/* Sezione Immagine */}
                <div className="mb-2 mx-auto md:w-1/3 w-full h-auto text-left mt-2 flex items-center justify-center">
                    <img
                        src={`/images/${pokemonData.englishName.toLowerCase().replace(" ", "")}.avif`}
                        alt={pokemonData.englishName}
                        className="mb-2 mx-auto w-72 h-auto mt-2"
                    />
                </div>

                {/* Sezione Dettagli */}
                <div className="md:bg-gray-200 bg-white flex-col md:w-2/3 w-full h-auto text-left rounded-lg">
                    <h1 className="text-6xl text-center m-8 p-6 pt-12 h-16 w-full"
                        style={{
                            fontFamily: "Lattolatoo, sans-serif",
                            fontWeight: "bolder",
                            color: "#ffde00",
                            textShadow:
                                "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                            marginBottom: "0.5rem",
                        }}
                    >
                        {pokemonData.englishName}
                    </h1>
                    <div className="flex md:flex flex-wrap w-full text-left rounded-lg mr-8 md:gap-0 gap-20 p-6" style={{ fontFamily: 'Unbounded, sans-serif', minHeight: "420px" }}>
                        {/* Colonna Dettagli 1 */}
                        <div className="w-96 h-auto text-left p-4 md:pl-24 pl-2">
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Generazione: </span>
                                {pokemonData.gen}
                            </p>
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Tipo: </span>
                                {pokemonData.secondaryType
                                    ? `${pokemonData.primaryType}, ${pokemonData.secondaryType}`
                                    : pokemonData.primaryType}
                            </p>
                            <p className="text-lg font-light mb-2">{pokemonData.classification}</p>
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Numero di Pokédex: </span>
                                {pokemonData.nationalNumber}
                            </p>
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Abilità: </span>
                                {pokemonData.abilities1
                                    ? `${pokemonData.abilities0}, ${pokemonData.abilities1}`
                                    : pokemonData.abilities0}
                            </p>
                            {pokemonData.abilitiesSpecial && (
                                <p className="text-lg font-light mb-2">
                                    <span className="font-bold">Abilità nascoste: </span>
                                    {pokemonData.abilitiesSpecial}
                                </p>
                            )}
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Altezza: </span>
                                {pokemonData.heightM} m
                            </p>
                            <p className="text-lg font-light mb-2">
                                <span className="font-bold">Peso: </span>
                                {pokemonData.weightKg} kg
                            </p>
                            {((pokemonData.isLegendary || pokemonData.isSubLegendary) === 1) && (
                                <p className="text-lg font-bold mb-2 text-violet-700">Pokémon leggendario</p>
                            )}
                            {pokemonData.isMythical === 1 && (
                                <p className="text-lg font-bold mb-2 text-green-400">Pokémon misterioso</p>
                            )}
                        </div>

                        {/* Colonna Dettagli 2 */}
                        <div className="md:w-auto h-auto text-left md:pl-16 md:pb-4">
                            <table className="table-auto w-full min-w-full border-collapse border-spacing-0">
                                <tbody>
                                    <tr>
                                        <td className="text-xs md:text-sm font-bold p-4 border-2 border-red-500">Tasso di cattura</td>
                                        <td className="text-xs md:text-sm font-light text-center p-4 border-2 border-red-500">
                                            {pokemonData.captureRate}
                                        </td>
                                        <td className="h-10 font-light p-4 border-2 border-red-500 md:w-44 w-20">
                                            <ProgressBar value={pokemonData.captureRate} max={255} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs md:text-sm font-bold p-4 border-2 border-red-500">Punti ferita</td>
                                        <td className="text-xs md:text-sm font-light text-center p-4 border-2 border-red-500">
                                            {pokemonData.hp}
                                        </td>
                                        <td className="h-10 font-light p-4 border-2 border-red-500 md:w-44 w-20">
                                            <ProgressBar value={pokemonData.hp} max={255} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs md:text-sm font-bold p-4 border-2 border-red-500">Attacco</td>
                                        <td className="text-xs md:text-sm font-light text-center p-4 border-2 border-red-500">
                                            {pokemonData.attack}
                                        </td>
                                        <td className="h-10 font-light p-4 border-2 border-red-500 md:w-44 w-20">
                                            <ProgressBar value={pokemonData.attack} max={255} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs md:text-sm font-bold p-4 border-2 border-red-500">Difesa</td>
                                        <td className="text-xs md:text-sm font-light text-center p-4 border-2 border-red-500">
                                            {pokemonData.defense}
                                        </td>
                                        <td className="h-10 font-light p-4 border-2 border-red-500 md:w-44 w-20">
                                            <ProgressBar value={pokemonData.defense} max={255} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs md:text-sm font-bold p-4 border-2 border-red-500">Velocità</td>
                                        <td className="text-xs md:text-sm font-light text-center p-4 border-2 border-red-500">
                                            {pokemonData.speed}
                                        </td>
                                        <td className="h-10 font-light p-4 border-2 border-red-500 md:w-44 w-20">
                                            <ProgressBar value={pokemonData.speed} max={255} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sezione descrizione */}
            <div className="flex-col p-8 rounded-lg border-2 border-gray-400">
                <h1 className="text-center text-6xl pt-4"
                            style={{
                                fontFamily: "Lattolatoo, sans-serif",
                                fontWeight: "bolder",
                                color: "#ffde00",
                                textShadow:
                                    "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                                marginBottom: "0.5rem",
                            }}>Descrizione</h1>
                <p className="font-medium text-xl" style={{ fontFamily: 'Unbounded, sans-serif' }}>{pokemonData.description}</p>
            </div>

            {/* Sezione Evoluzione */}
            {(pokemonData.evoChain0 || pokemonData.evoChain2 || pokemonData.evoChain4) && (
                <div className="flex-col p-8 rounded-lg border-2 border-gray-400 ">
                    <h1 className="text-center text-6xl pt-4"
                        style={{
                            fontFamily: "Lattolatoo, sans-serif",
                            fontWeight: "bolder",
                            color: "#ffde00",
                            textShadow:
                                "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                            marginBottom: "0.5rem",
                        }}>Evochain</h1>
                    <div className="md:flex justify-center items-center w-full gap-24">
                        {pokemonData.evoChain0 && (
                            <div className="flex flex-col items-center justify-center gap-3">
                                <img
                                    src={`/images/${pokemonData.evoChain0.toLowerCase().replace(" ", "")}.avif`}
                                    alt={pokemonData.evoChain0}
                                    className="size-44"
                                />
                                <p className="text-5xl">
                                    <span
                                    style={{
                                        fontFamily: "Lattolatoo, sans-serif",
                                        fontWeight: "bolder",
                                        color: "#ffde00",
                                        textShadow:
                                            "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                                        marginBottom: "0.5rem",
                                    }}>{pokemonData.evoChain0}</span>
                                </p>
                            </div>
                        )}
                        {pokemonData.evoChain2 && <ChevronRight className="size-10" />}
                        {pokemonData.evoChain2 && (
                            <div className="flex flex-col items-center justify-center gap-3">
                                <img
                                    src={`/images/${pokemonData.evoChain2.toLowerCase().replace(" ", "")}.avif`}
                                    alt={pokemonData.evoChain2}
                                    className="size-44"
                                />
                                <p className="text-5xl">
                                <span
                                    style={{
                                        fontFamily: "Lattolatoo, sans-serif",
                                        fontWeight: "bolder",
                                        color: "#ffde00",
                                        textShadow:
                                            "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                                        marginBottom: "0.5rem",
                                    }}>{pokemonData.evoChain2}</span>
                                </p>
                            </div>
                        )}
                        {pokemonData.evoChain4 && <ChevronRight className="size-10" />}
                        {pokemonData.evoChain4 && (
                            <div className="flex flex-col items-center justify-center gap-3">
                                <img
                                    src={`/images/${pokemonData.evoChain4.toLowerCase().replace(" ", "")}.avif`}
                                    alt={pokemonData.evoChain4}
                                    className="size-44"
                                />
                                <p className="text-5xl">
                                <span
                                    style={{
                                        fontFamily: "Lattolatoo, sans-serif",
                                        fontWeight: "bolder",
                                        color: "#ffde00",
                                        textShadow:
                                            "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca",
                                        marginBottom: "0.5rem",
                                    }}>{pokemonData.evoChain4}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonDetail;
