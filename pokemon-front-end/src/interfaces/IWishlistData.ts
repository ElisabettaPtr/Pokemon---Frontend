export interface IWishlistData {
    pokemon: {
        englishName: string;
        percentFemale: number;
        hp: number;
        description: string;
        isSubLegendary: number;
        evoChain4: string | null;
        speed: number;
        gen: string;
        megaEvolution: string;
        percentMale: number;
        defense: number;
        evoChain2: string;
        primaryType: string;
        attack: number;
        evoChain0: string;
        abilitiesSpecial: string;
        isLegendary: number;
        heightM: number;
        secondaryType: string;
        isMythical: number;
        abilities1: string;
        abilities0: string;
        classification: string;
        captureRate: number;
        nationalNumber: number;
        weightKg: number;
    };
    idWishlist: number;
    nationalNumber: number;
}