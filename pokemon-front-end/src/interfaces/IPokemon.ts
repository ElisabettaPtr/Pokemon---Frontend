export interface IPokemon {
    nationalNumber: number;
    gen: string;
    englishName: string;
    primaryType: string;
    secondaryType: string | null;
    classification: string;
    percentMale: number;
    percentFemale: number;
    heightM: number;
    weightKg: number;
    captureRate: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    abilities0: string;
    abilities1: string | null;
    abilitiesSpecial: string | null;
    isSubLegendary: number;
    isLegendary: number;
    isMythical: number;
    evoChain0: string;
    evoChain2: string | null;
    evoChain4: string | null;
    megaEvolution: string | null;
    description: string;
}
