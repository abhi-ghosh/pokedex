import { motion } from "motion/react"
import { Search } from 'lucide-react'
export default function Searchbar({searchQuery, setSearchQuery, handleSearch, disabled}) {
  return (
    //* Search bar div
    <div className="bg-white dark:bg-navy h-18 w-full p-3.5 rounded-2xl search-container
      flex flex-row items-center justify-center gap-2 shadow-md transition-colors duration-300">
      {/*//* Search icon and input field */}
      <Search className="text-gray-500 w-8 h-auto shrink-0"/>
      <input
        className="text-navy-dark dark:text-off-white w-full h-full outline-none
        border-none font-outfit text-lg placeholder:text-gray-500
        placeholder:text-lg"
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
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
    </div>
  )
}