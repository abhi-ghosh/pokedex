import { Moon, Sun } from 'lucide-react'
import { motion } from "motion/react"
export default function ThemeToggle ({darkMode, changeTheme}){
  return (
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
  )
}