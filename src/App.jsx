import { useState, useEffect } from 'react'
import States from './components/States';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import { motion } from "motion/react"
import searchPokemon from './services/pokeapi';
import UIStatus from './components/UIStatus';
function App() {
  const [state, setState] = useState(States.IDLE);
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    setDarkMode(prev=>!prev);
  }
  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const handleSearch = async (pokemon)=>{
    setState(States.LOADING);
    setError(null);
    setPokemonData(null);
    try {
      const data = await searchPokemon(pokemon);
      setPokemonData(data);
      // setState(States.RESULT);
    } catch (err){
      setError(err);
      console.log ("Error");
      // setState(States.ERROR);
    }
  }
return (
  <div className="flex flex-col items-center justify-center min-h-screen
  bg-off-white dark:bg-navy-dark p-8" >
    <motion.div  initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    className="w-full max-w-2xl mb-8">
      <Header>
        <ThemeToggle darkMode={darkMode} changeTheme={changeTheme}/>
      </Header>
      <Searchbar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                state={state}
                disabled = {state === States.LOADING}
      />
    </motion.div>
    <UIStatus state={state} error={error}/>
    <Footer/>
  </div>
)
}
export default App
