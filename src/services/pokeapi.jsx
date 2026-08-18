  const searchPokemon = async (pokemon)=>{
      //* removing spaces and replacing them with "-" in searchQuery
      //* making searchQuery lowercase
      const name = pokemon.toLowerCase().replaceAll(" ", "-");
      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const response2 = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      if (response1.status === 404 || response2.status === 404) {
        throw new Error("not-found");
      }
      if (!response1.ok || !response2.ok) {
        throw new Error("server-error");
      }
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data = {pokemon: data1, species: data2};
      return data;
  }
  export default searchPokemon;