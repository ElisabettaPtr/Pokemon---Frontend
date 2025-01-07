const LandingPage = () => {
    return (
        <>
            <div className="flex flex-col items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/pokemon.pokeball.jpg')", height: "960px" }}>
                <div className="flex flex-col items-center text-center mt-24 gap-12 md:gap-8 md:mt-20">
                    <h1 className="text-6xl md:text-7xl md:mb-10 mb-96" style={{
                        fontFamily: 'Pokemon Solid, sans-serif',
                        color: "#ffde00",
                        textShadow: "2px 0 #3b4cca, -2px 0 #3b4cca, 0 2px #3b4cca, 0 -2px #3b4cca, 1px 1px #3b4cca, -1px -1px #3b4cca, 1px -1px #3b4cca, -1px 1px #3b4cca"
                    }}>GOTTA CATCH 'EM ALL!</h1>
                    <h2 className="text-xl md:text-2xl" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "white",
                        textShadow: "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
                    }}>ALLENATORE , BENVENUTO ! TI STAVAMO ASPETTANDO !</h2>
                    <h2 className="text-xl md:text-2xl" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "white",
                        textShadow: "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
                    }}>PRONTO A CREARE IL TUO POKÉDEX VIRTUALE ?</h2>
                </div>
                <div className="flex flex-col items-center text-center mt-10 gap-14 md:mt-80 w-full md:w-1/2">
                    <h2 className="hidden md:block font-serif text-2xl" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "red",
                        textShadow: "2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000, 1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000"
                    }}>AGGIUNGI AL TUO POKÉDEX I POKÉMON CHE HAI GIÀ CATTURATO</h2>
                    <h2 className="hidden md:block font-serif text-2xl" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "red",
                        textShadow: "2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000, 1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000"
                    }}>I POKÉMON CHE INVECE DESIDERI CATTURARE , PUOI AGGIUNGERLI ALLA TUA WISHLIST !</h2>
                    <a href="/login" className="btn btn-wide bg-white border-2 border-black text-2xl rounded-full pt-4" style={{
                        fontFamily: 'Lattolatoo, sans-serif',
                        fontWeight: "bolder",
                        color: "black",
                        // textShadow: "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
                    }}>INIZIA ORA !</a>
                </div>
            </div>
        </>
        
    )
}

export default LandingPage;
