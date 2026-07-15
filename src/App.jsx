import { useState } from 'react'
function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchPokemon = async (pokemon)=>{
    setLoading(true);
    setError(null);
    setPokemonData(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    // .then(response => response.json())
    // .then(data => setPokemonData(data))
    // .catch(error => setError(error) )
    // .finally(() => setLoading(false));
  }
return (
  <div className="App">
    <h1 className="text-red-600">Pokedex</h1>
    <h1>Pokemon Search</h1>
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter Pokemon name"
        onChange={(e) => setPokemon(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && searchPokemon(pokemon)}/>
      <button onClick={() => searchPokemon(pokemon)}>Search</button>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border text-success" role="status"></div>
        </div>
      ) :pokemonData && pokemonData.sprites ? (
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
      ): error ? (<img src='assets/joy.jpg'/>) : null}
    </div>
    {error && <p>Sorry! No record found :(</p>}
  </div>
)
}

export default App
