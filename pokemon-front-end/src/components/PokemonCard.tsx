import IPokemon from "@/interfaces/IPokemon";
import { Card } from "./ui/card";

const PokemonCard = ({ englishName, nationalNumber, primaryType, secondaryType }: IPokemon) => {
    return (
        <Card className="relative text-center min-w-44 min-h-60 bg-white rounded-lg p-4 shadow-md hover:border-red-400 border-2 border-white items-center overflow-hidden">
            {/* Immagine */}
            <div className="w-full h-32 flex items-center justify-center mb-6">
                <img
                    src={`images/${englishName.toLowerCase()}.avif`}
                    alt={englishName}
                    className="object-contain max-h-full"
                />
            </div>

            {/* Contenuti */}
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-yellow-400" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "#ffde00",
                        textShadow: "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca"
                    }}
                >
                    {englishName}
                </h2>
                <p className="text-sm text-muted-foreground">#{nationalNumber}</p>
                <p className="text-sm text-muted-foreground">
                    {primaryType}
                    {secondaryType && `, ${secondaryType}`}
                </p>
            </div>
        </Card>
    );
};

export default PokemonCard;
