import { useState } from 'react'
import {Zap, Search} from 'lucide-react'
import searchPokemon from './services/pokeapi';
import Idle from './components/Idle';
function App() {
  const [state, setState] = useState({

  });
  const [searchQuery, setSearchQuery] = useState(null);
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
  <div className="flex flex-col items-center justify-center min-h-screen bg-off-white p-8">
    {/* Heading and Search bar container */}
    <div className="w-full max-w-lg mb-8">
      {/* Heading container */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center gap-1">
          <Zap className="text-coral w-6 h-auto"/>
          <h1 className="text-coral font-outfit font-bold text-xl">POKÉDEX</h1>
        </div>
        <p className="text-gray-500 font-outfit text-md">Powered by PokéAPI</p>
      </div>
      {/* Search bar container */}
      <div className="bg-white h-18 w-full p-3.5 rounded-2xl search-container
            flex flex-row items-center justify-center gap-2 shadow-md">
        <Search className="text-gray-500 w-8 h-auto"/>
        <input
          className="w-full h-full outline-none border-none font-outfit text-lg"
          type="text"
          placeholder="Search for a Pokémon..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}/>
        <button className="bg-coral h-full px-6 rounded-3xl text-white "
                onClick={() => handleSearch(searchQuery)}>Search
        </button>
      </div>
    </div>
    <Idle/>
  </div>
)
}

export default App
