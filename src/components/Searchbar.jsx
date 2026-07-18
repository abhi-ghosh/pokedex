import React from 'react';
export default function Idle({pokemon, setPokemon, handleSearch}) {
  return (
    <div>
      <h1 className="text-red-600">Pokedex</h1>
      <h1>Pokemon Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Pokemon name"
          onChange={(e) => setPokemon(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(pokemon)}/>
        <button onClick={() => handleSearch(pokemon)}>Search</button>
      </div>
    </div>

  )
}