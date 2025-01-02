import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PokemonList from "./components/PokemonList";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Layout/>}>
          <Route index element={<PokemonList />} />
          <Route path="*" element={<>Page not found!</>} />
      </Route>
    </Routes>
  )
}

export default App;
