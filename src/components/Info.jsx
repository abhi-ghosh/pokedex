import InfoPill from "./InfoPill";
import { typeColors, typeDefense } from "./data";
import { AnimatePresence, motion } from "motion/react"
export default function Info({pokemonData, pokemonSpecies, shadowColor}) {
  const quote = pokemonSpecies?.flavor_text_entries.find(flavor => flavor.language.name === "en");
  return (
  <AnimatePresence>
    <motion.div className="flex flex-col gap-5 overflow-y-auto"
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration: 0.15, ease:"easeOut"}}
    >
      <p className="font-outfit dark:text-off-white p-3 rounded-2xl"
        style={
          { backgroundColor: `${shadowColor}20`,
            borderLeft: `5px solid ${shadowColor}`
          }}
      >
        "{quote?.flavor_text.replace("-", " ").replace("POKéMON", "pokémon")}"
      </p>
    </motion.div>
  </AnimatePresence>
  )
}