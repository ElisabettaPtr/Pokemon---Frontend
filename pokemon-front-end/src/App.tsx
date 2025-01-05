import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/auth/Register";
import PokemonList from "./pages/PokemonList";
import Login from "./pages/auth/Login";
import PersonalPokedex from "./pages/PersonalPokedex";
import PersonalWishlist from "./pages/PersonalWishlist";
import PokemonDetail from "./pages/PokemonDetail";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/homepage" element={<LandingPage />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<PokemonList/>} />
        <Route path="/my-pokedex" element={<PersonalPokedex/>} />
        <Route path="/my-wishlist" element={<PersonalWishlist/>} />
        <Route path="/pokemon-detail/:nationalNumber" element={<PokemonDetail/>}/>
        <Route path="/profile/:idUser" element={<Profile/>}/>
      </Route>
      <Route path="*" element={<>Page not found!</>} />
    </Routes>
  );
}

export default App;
