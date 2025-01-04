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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Accesso non autorizzato.");

  const response = await fetch("http://localhost:8000/api/v1/pokedex", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessione scaduta. Effettua nuovamente il login.");
    } else {
      throw new Error("Errore nel caricamento del Pokedex.");
    }
  }

  const pokedexList = await response.json();
  const mappedPokemonList = pokedexList.map((entry: any) => ({
      nationalNumber: entry.nationalNumber,
      englishName: entry.pokemon.englishName,
      primaryType: entry.pokemon.primaryType,
      secondaryType: entry.pokemon.secondaryType
    })
  );
  return mappedPokemonList;
};

const fetchWishlistList = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Accesso non autorizzato.");

  const response = await fetch("http://localhost:8000/api/v1/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sessione scaduta. Effettua nuovamente il login.");
    } else {
      throw new Error("Errore nel caricamento del Wishlist.");
    }
  }

  const wishlistList = await response.json();
  const mappedPokemonList = wishlistList.map((entry: any) => ({
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
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<PokemonList fetchFunction={fetchPokemonList} />} />
        <Route path="/my-pokedex" element={<PokemonList fetchFunction={fetchPokedexList} />} />
        <Route path="/my-wishlist" element={<PokemonList fetchFunction={fetchWishlistList} />} />
      </Route>
      <Route path="*" element={<>Page not found!</>} />
    </Routes>
  );
}

export default App;
