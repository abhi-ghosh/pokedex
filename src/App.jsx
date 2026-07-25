import { useState, useEffect } from 'react'
import { motion } from "motion/react"
import {Zap, Search, Heart, Sun, Moon} from 'lucide-react'
import searchPokemon from './services/pokeapi';
import Idle from './components/Idle';
function App() {
  const [state, setState] = useState({

  });
  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    const change = !darkMode;
    setDarkMode(change);
    document.documentElement.classList.toggle("dark",change);
    console.log("theme changed")
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);

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
  <div className="flex flex-col items-center justify-center min-h-screen bg-off-white dark:bg-navy-dark p-8" >
    {/* Heading and Search bar container */}
    <motion.div  initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl mb-8">
      {/* Heading container */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="flex items-center justify-center gap-1">
          <Zap className="text-coral w-6 h-auto"/>
          <h1 className="text-coral font-outfit font-bold text-xl">POKÉDEX</h1>
        </div>
        <p className="text-gray-500 font-outfit text-md">Powered by PokéAPI</p>
        <motion.button className="bg-white dark:bg-navy h-10 px-4 rounded-3xl text-off-white cursor-pointer
                        absolute top-0 right-0 flex items-center justify-center gap-2 shadow-md" onClick={changeTheme}
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95}}
                >
            <p className={`text-gray-500 dark:text-off-white font-outfit text-md`}>{darkMode ? 'Light' : 'Dark'}</p>
            <motion.div key={darkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}>
              {darkMode ? <Sun className="text-off-white w-4 h-auto"/> : <Moon className="text-gray-500 w-4 h-auto"/>}
            </motion.div>

        </motion.button>
      </div>
      {/* Search bar container */}
      <div className="bg-white dark:bg-navy h-18 w-full p-3.5 rounded-2xl search-container
            flex flex-row items-center justify-center gap-2 shadow-md">
        <Search className="text-gray-500 w-8 h-auto"/>
        <input
          className="w-full h-full outline-none border-none font-outfit text-lg placeholder:text-gray-500"
          type="text"
          placeholder="Search for a Pokémon..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}/>
        <motion.button className="bg-coral h-full px-6 rounded-3xl text-off-white cursor-pointer"
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95, backgroundColor: '#091d26', color: '#f4f0eb' }}
                onClick={() => handleSearch(searchQuery)}>Search
        </motion.button>
      </div>
    </motion.div>
    <Idle/>
    <div className='flex flex-row gap-1.5 items-center mt-8 text-gray-500 font-outfit text-md'>
      Made with
      <Heart className="text-coral font-outfit font-bold"/> by
      <a href='https://github.com/abhi-ghosh' target='_blank' rel='noreferrer'
        className="text-coral font-outfit font-bold
        hover:text-navy-dark dark:hover:text-off-white transition-color duration-200">
          Abhijit Ghosh
      </a>
    </div>
  </div>
)
}
export default App
