import { useState, useEffect } from 'react'
import States from './components/States';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import { motion } from "motion/react"
import searchPokemon from './services/pokeapi';
import UIStatus from './components/UIStatus';
import Results from './components/Results';
import Stats from './components/Stats';
import ImageContainer from './components/ImageContainer';

//* Main App
function App() {
  //* APP states
  const [state, setState] = useState(States.IDLE);

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
  const [searchQuery, setSearchQuery] = useState(null);

  //* Pokemon (after search response)
  const [pokemonData, setPokemonData] = useState(null);

  //* Error
  const [error, setError] = useState(null);

  //* Search function
  const handleSearch = async (pokemon)=>{
    setState(States.LOADING);
    setError(null);
    setPokemonData(null);
    //* API (service) returns a promise so we need to await it
    try {
      const data = await searchPokemon(pokemon);
      setPokemonData(data);
      setState(States.RESULT);
    } catch (err){
      setError(err);
      setState(States.ERROR);
    }
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
                disabled = {state === States.LOADING || searchQuery === null || searchQuery === ""}
      />
    </motion.div>

    {/* //* UI Status or Results based on if Idle, if pokemon is found or server error */}
    {state !== States.RESULT ?
      <UIStatus state={state} error={error}/> :
      <Results pokemonData={pokemonData}>
        <ImageContainer pokemonData={pokemonData} darkMode={darkMode}/>
        <Stats pokemonData={pokemonData}/>
      </Results>
    }

    {/* //* Footer */}
    <Footer/>
  </div>
)
}
export default App
