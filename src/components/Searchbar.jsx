import {AnimatePresence, motion } from "motion/react"
import { Search } from 'lucide-react'
export default function Searchbar({searchQuery, setSearchQuery, handleSearch, disabled, children,
  suggestions, showSuggestions, setShowSuggestions, handleDownArrow, handleUpArrow, suggHighlight, fetchSuggestions}){ {
  return (
    //* Search bar div
    <div className="bg-white dark:bg-navy h-18 w-full p-3.5 rounded-2xl search-container
      flex flex-row items-center justify-center gap-2 shadow-md transition-colors duration-300 relative">
      {/*//* Search icon and input field */}
      <Search className="text-gray-500 w-8 h-auto shrink-0"/>
      <input
        className="text-navy-dark dark:text-off-white w-full h-full outline-none
        border-none font-outfit text-lg placeholder:text-gray-500
        placeholder:text-lg"
        type="text"
        onFocus={() => setShowSuggestions(true)}
        //* Delay hiding suggestions onBlur to allow click event to register
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        value={searchQuery}
        placeholder={"Search Pokémon..."}
        onChange={(e) => {
          fetchSuggestions(e.target.value);
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) =>{
          e.key === 'Escape' && setShowSuggestions(false);
          e.key === 'Enter' && handleSearch(suggHighlight >= 0 ? suggestions[suggHighlight].name : searchQuery);
          e.key === "ArrowDown" && handleDownArrow();
          e.key === "ArrowUp" && handleUpArrow();
        }}
        />
      {/*//* Search button */}
      <motion.button className="bg-coral h-full px-4 md:px-6 rounded-3xl text-off-white
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        whileHover={{ scale: 1.05}}
        whileTap={{ scale: 0.95, backgroundColor: '#091d26', color: '#f4f0eb' }}
        onClick={() => handleSearch(searchQuery)}
        disabled={disabled}>
          Search
      </motion.button>
      {/*//* Search suggestions */}
      <AnimatePresence>
        {searchQuery && searchQuery.length > 0 && suggestions.length > 0 && showSuggestions &&
          <motion.div className="bg-off-white/70 dark:bg-navy/70 backdrop-blur-md dark:text-off-white
            font-mono w-full absolute top-20 z-10 rounded-2xl shadow-lg transition-colors duration-300 p-2
            max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-coral scrollbar-track-transparent"
            initial = {{height: 0}}
            animate = {{height: "auto"}}
            exit = {{height: 0}}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}}