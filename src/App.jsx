import { useState } from 'react'
import searchPokemon from './services/pokeapi';
import Searchbar from './components/Searchbar';
function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = async (pokemon)=>{
    setLoading(true);
    setError(null);
    setPokemonData(null);
    try {
      const data = await searchPokemon(pokemon);
      setPokemonData(data);
    } catch (err){
      setError(err);
    } finally {
      setLoading(false);
    }
  }
return (
  <div className="App">
    <Idle setPokemon={setPokemon} handleSearch={handleSearch} pokemon={pokemon}/>
  </div>
)
}

export default App
