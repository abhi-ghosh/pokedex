import StatPill from "./StatPill";
import { statColors } from "./data";
import { AnimatePresence, motion } from "motion/react"
export default function BaseStats({pokemonData}){
  return (
  <AnimatePresence>
    <motion.div className="flex flex-col justify-between gap-5 h-full"
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration: 0.15, ease:"easeOut"}}
    >
      {/*//* Base stats & total stat */}
      <div className="flex flex-row align-center text-gray-500
        justify-between">
        <p className="font-bold font-outfit">BASE STATS</p>
        <p className="font-bold font-mono">
          Total: {pokemonData.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
        </p>
      </div>
      {/*//* Stat pills (progress bars) mapped over stats array */}
      <div className="flex flex-col gap-3">
        {pokemonData.stats.map((stat) => (
          <StatPill stat={stat.base_stat} key={stat.stat.name}
            name={statColors[stat.stat.name].label}
            color={statColors[stat.stat.name].color}
          />
        ))}
      </div>
      <div className="w-full h-full flex flex-col p-3 md:p-0
        justify-center items-center gap-3 bg-off-white
        dark:bg-navy-dark rounded-2xl"
      >
        <p className="font-bold font-outfit text-gray-500 dark:text-gray-400">
          BASE EXPERIENCE
        </p>
        <p className="font-black font-mono text-2xl dark:text-off-white">
          {pokemonData.base_experience}
        </p>
      </div>
    </motion.div>
  </AnimatePresence>
  )
}