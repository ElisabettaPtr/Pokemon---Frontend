import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/auth/Register";
import PokemonList from "./pages/PokemonList";
import Login from "./pages/auth/Login";

const fetchPokemonList = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Accesso non autorizzato.");
  
  const response = await fetch("http://localhost:8000/api/v1/pokemon", {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error("Errore nel caricamento dei Pokémon.");
  }

  return await response.json();
};

const fetchPokedexList = async () => {
  // Ottieni il token dell'utente
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Accesso non autorizzato.");

  // Fai la richiesta per ottenere il Pokedex
  const response = await fetch("http://localhost:8000/api/v1/pokedex", {
    headers: {
      Authorization: `Bearer ${token}`,  // Passa il token nell'header per l'autenticazione
    },
  });

  // Gestisci gli errori se la risposta non è ok
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessione scaduta. Effettua nuovamente il login.");
    } else {
      throw new Error("Errore nel caricamento del Pokedex.");
    }
  }

  // Estrai i dati JSON dalla risposta
  const pokedexList = await response.json();

  // Puoi elaborare i dati, per esempio, mappando la struttura se necessario
  const mappedPokemonList = pokedexList.map((entry: any) => ({
      nationalNumber: entry.nationalNumber,
      englishName: entry.pokemon.englishName,
      primaryType: entry.pokemon.primaryType,
      secondaryType: entry.pokemon.secondaryType
    })
  );
  return mappedPokemonList;
};


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Layout/>}>
          <Route index element={<PokemonList fetchFunction={fetchPokemonList}/>} />
          <Route path="/my-pokedex" element={<PokemonList fetchFunction={fetchPokedexList} />} />
      </Route>
      <Route path="*" element={<>Page not found!</>} />
    </Routes>
  )
}

export default App;
