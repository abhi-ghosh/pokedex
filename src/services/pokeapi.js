//* API call for Pokémon suggestions from the PokeAPI
const getSuggestions = async()=>{
  //* Fetching all Pokémon names from the PokeAPI
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  if(!response.ok){
    throw new Error("server-error");
  }
  const data = await response.json();
  const suggestions = data.results.map(pokemon => {
    //* Get the Pokémon ID (second-to-last part of the URL)
    const id = pokemon.url.split("/").at(-2);
    return {
      name: pokemon.name,
      //* Making the URL for the sprite with id
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    };
  });
  return suggestions;
}

//* Search function API call for Pokémon data from the PokeAPI
  const searchPokemon = async (pokemon)=>{

      //* removing spaces and replacing them with "-" in searchQuery
      //* making searchQuery lowercase
      const name = pokemon.toLowerCase().replaceAll(" ", "-");

      //* Main API for Pokémon
      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      //* Checking if the pokemon exists
      if (response1.status === 404) {
        throw new Error("not-found");
      }
      //* Checking if the response is ok
      if (!response1.ok) {
        throw new Error("server-error");
      }

      //* Parsing main Pokémon data
      const data1 = await response1.json();

      //* Secondary API for Pokémon species from the data1 from the main API
      const response2 = await fetch (data1.species.url);

      //* Abilities API for Pokémon abilities from data1 from the main API
      const abilitiesArr = await Promise.all(data1.abilities.map(ability => fetch(ability.ability.url)));

      //* Getting the moves from data1 from the main API
      const movesArr = await Promise.all(data1.moves.map(move=>fetch(move.move.url)));

      //* Checking if the response is ok from the secondary API and abilities API
      if (!response2.ok || abilitiesArr.some(response => !response.ok) || movesArr.some(response => !response.ok)) {
        throw new Error("server-error");
      }

      //* Parsing Pokémon species, Pokémon abilities & Pokémon moves data
      const data2 = await response2.json();
      const abilities = await Promise.all(abilitiesArr.map(ability => ability.json()));
      const moves = await Promise.all(movesArr.map(move => move.json()));

      //* Combining the data & returning the data object
      const data = {pokemon: data1, species: data2, abilities: abilities, moves: moves};
      return data;
  }
  export {searchPokemon, getSuggestions};