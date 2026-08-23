  const searchPokemon = async (pokemon)=>{
      //* removing spaces and replacing them with "-" in searchQuery
      //* making searchQuery lowercase
      const name = pokemon.toLowerCase().replaceAll(" ", "-");
      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response1.status === 404) {
        throw new Error("not-found");
      }
      if (!response1.ok) {
        throw new Error("server-error");
      }
      const data1 = await response1.json();
      const response2 = await fetch (data1.species.url);
      const abilitiesArr = await Promise.all(data1.abilities.map(ability => fetch(ability.ability.url)));
      if (!response2.ok || abilitiesArr.some(response => !response.ok)) {
        throw new Error("server-error");
      }
      const data2 = await response2.json();
      const abilities = await Promise.all(abilitiesArr.map(ability => ability.json()));
      const data = {pokemon: data1, species: data2, abilities: abilities};
      return data;
  }
  export default searchPokemon;