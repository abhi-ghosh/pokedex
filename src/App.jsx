import { useState, useEffect } from 'react'
import States from './components/States';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import { motion } from "motion/react"
import searchPokemon from './services/pokeapi';
import Idle from './components/Idle';
function App() {
  const [state, setState] = useState(States.IDLE);
  // switch (state) {
  //   case States.IDLE:
  //     return <Idle/>;
  //     break;
  //   case States.LOADING:
  //     return <Loading/>;
  //     break;
  //   case States.RESULT:
  //     return <Result/>;
  //     break;
  //   case States.ERROR:
  //     return <Error/>;
  //     break;
  //   default:
  //     return <Idle/>;
  //     break;
  // }
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
      />
    </motion.div>
    <Idle/>
    <Footer/>
  </div>
)
}
export default App
