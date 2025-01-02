interface IPokemon {
    nationalNumber: number;
    gen: string;
    englishName: string;
    primaryType: string;
    secondaryType: string | null; // Può essere null se non esiste un secondo tipo
    classification: string;
    percentMale: number; // Assuming percentage as a decimal number (0 to 1 range)
    percentFemale: number; // Same assumption as above
    heightM: number; // In meters
    weightKg: number; // In kilograms
    captureRate: number; // Capture rate as a percentage (0 to 100)
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    abilities0: string;
    abilities1: string | null; // Second ability may be null
    abilitiesSpecial: string | null; // Special abilities may be null
    isSubLegendary: number; // 0 for false, 1 for true
    isLegendary: number; // 0 for false, 1 for true
    isMythical: number; // 0 for false, 1 for true
    evoChain0: string;
    evoChain2: string | null; // Evolution chain 2 may be null if it doesn't exist
    evoChain4: string | null; // Evolution chain 4 may be null if it doesn't exist
    megaEvolution: string | null; // Mega evolution may be null if not applicable
    description: string;
}

export default IPokemon;
