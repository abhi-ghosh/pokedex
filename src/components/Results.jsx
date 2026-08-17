import { motion } from "motion/react"
export default function Results({children}){
  return (
    //* Search results div if pokemon is found
      <motion.div
        className="bg-white dark:bg-navy flex
          flex-col md:flex-row lg:flex-row
          justify-between max-w-4xl rounded-2xl shadow-md
          w-full transition-colors duration-300 overflow-hidden"
          initial={{scale:0}} animate={{scale:1}}
      >
      {/*//* Search results - ImageContainer & Stats */}
        {children}
      </motion.div>
  )
}