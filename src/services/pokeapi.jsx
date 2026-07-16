  const searchPokemon = async (pokemon)=>{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      if (response.status === 404) {
        throw new Error("not-found");
      }
      if (!response.ok) {
        throw new Error("server-error");
      }
      const data = await response.json();
      return data;
  }
  export default searchPokemon;