import { useState, useEffect } from 'react'
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import { color, motion } from "motion/react"
import {searchPokemon, getSuggestions} from './services/pokeapi';
import UIStatus from './components/UIStatus';
import Results from './components/Results';
import Stats from './components/Stats';
import ImageContainer from './components/ImageContainer';
import BaseStats from './components/BaseStats';
import Info from './components/Info'
import Moves from './components/Moves'
import SearchSuggestions from './components/SearchSuggestions';
import {typeColors, states} from "./components/data";

//* Main App
function App() {
  //* APP states
  const [state, setState] = useState(states.IDLE);

  //* Theme state (darkMode on or off)
  const [darkMode, setDarkMode] = useState(false);

  //* Function to change theme
  const changeTheme = () => {
    setDarkMode(prev=>!prev);
  }
  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);

  //* Search state (pokemon name)
  const [searchQuery, setSearchQuery] = useState("");

  //*Search suggestions visibility state
  const [showSuggestions, setShowSuggestions] = useState(false);

  //* Search suggestions array state
  const [suggestions, setSuggestions] = useState([]);

  //* Pokemon (after search response)
  const [data, setData] = useState(null);
  const pokemonData = data?.pokemon;
  const pokemonSpecies = data?.species;
  const abilities = data?.abilities;
  const pokeMoves = data?.moves;

  //* Error
  const [error, setError] = useState(null);

    //* Search suggestions from the loaded Pokémon names from the useEffect below **
  const [allPokemon, setAllPokemon] = useState([]);
  useEffect(() => {
      const pokemonNamesFiltered = (allPokemon.filter(
        suggestion => suggestion.name.startsWith(searchQuery.toLowerCase())).slice(0, 10));
      setSuggestions(pokemonNamesFiltered);
  },[searchQuery, allPokemon]);

  //* useEffect to get all the available Pokémon names for suggestions when the app loads **
  useEffect(() => {
    const getPokemonNames = async () => {
    try {
      const suggesArr = await getSuggestions();
      setAllPokemon(suggesArr);
    } catch (err) {
      console.error(err);
    }
  }
  getPokemonNames();
  }
  , []);

  //* Function to handle suggestion click
  const onSuggestionsClick = (suggestion) => {
    setShowSuggestions(false);
    handleSearch(suggestion.name);
    setSearchQuery(suggestion.name);
  }

  //* Search function for Pokémon data from the PokeAPI
  const handleSearch = async (pokemon)=>{
    setShowSuggestions(false);
    setState(states.LOADING);
    setSuggestions([]);
    setError(null);
    setData(null);
    setButton("Stats");

    //* API (service) returns a promise so we need to await it
    try {
      const data = await searchPokemon(pokemon);
      setData(data);
      setState(states.RESULT);
    } catch (err){
      setError(err);
      setState(states.ERROR);
    }
  }

  //* Getting the theme color of the pokemon based on it's type
  const shadowColor = pokemonData
    ? typeColors[pokemonData.types[0].type.name].color
    : null;

  //* Button state for stat buttons (Stats, Moves, Info)
  const [button, setButton] = useState("Stats");
  //* Which state is rendered based on "button"
  let stat;
  switch (button) {
    case ("Stats"):
      stat = <BaseStats pokemonData={pokemonData}/>;
      break;
    case ("Moves"):
      stat = <Moves pokemonData={pokemonData}
                    shadowColor={shadowColor}
                    typeColors={typeColors}
                    darkMode={darkMode}
                    pokeMoves={pokeMoves}
              />;
      break;
    case ("Info"):
      stat = <Info pokemonData={pokemonData}
                  pokemonSpecies={pokemonSpecies}
                  shadowColor={shadowColor}
                  darkMode={darkMode}
                  abilities={abilities}
              />;
      break;
    default:
      stat = <BaseStats pokemonData={pokemonData}/>;
  }
return (
  //* Main App
  <div className="flex flex-col items-center justify-center min-h-screen
  bg-off-white dark:bg-navy-dark p-8 transition-colors duration-300" >
    <motion.div  initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    className="w-full max-w-2xl mb-8">

      {/* //* Header and Searchbar */}
      <Header>
        <ThemeToggle darkMode={darkMode} changeTheme={changeTheme}/>
      </Header>
      <Searchbar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                state={state}
                suggestions={suggestions}
                disabled = {state === states.LOADING || searchQuery === ""}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
      >
        <SearchSuggestions suggestions={suggestions}
          onSuggestionsClick={onSuggestionsClick}
          searchQuery={searchQuery}
        />
      </Searchbar>
    </motion.div>

    {/* //* UI Status or Results based on if Idle, if pokemon is found or server error */}
    {state !== states.RESULT ?
      <UIStatus state={state} states={states} error={error}/> :
      <Results pokemonData={pokemonData}>
        <ImageContainer pokemonData={pokemonData} darkMode={darkMode}
          typeColors={typeColors} shadowColor={shadowColor}
        />
        <Stats button={button} setButton={setButton}>
          {stat}
        </Stats>
      </Results>
    }

    {/* //* Footer */}
    <Footer/>
  </div>
)
}
export default App
