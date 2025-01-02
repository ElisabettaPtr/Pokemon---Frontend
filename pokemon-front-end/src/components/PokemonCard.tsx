import IPokemon from "@/interfaces/IPokemon";
import { Card } from "./ui/card";

const PokemonCard = ({englishName, nationalNumber, primaryType, secondaryType}: IPokemon) => {
    return (
        <Card className="relative text-center min-w-44 max-h-60 bg-white rounded-lg p-4 shadow-md hover:border-red-400 border-2 border-white mb-6 items-center">
                <div className="size-44 flex items-center">
                    <img src="img" alt="img" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-yellow-400">{englishName}</h2>
                    <p className="text-sm text-muted-foreground"> #{nationalNumber}</p>
                    <p className="text-sm text-muted-foreground">{primaryType}, {secondaryType}</p>
                </div>
        </Card>
    )
}

export default PokemonCard;
