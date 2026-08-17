import {useState} from "react";
import { AnimatePresence, motion } from "motion/react"
import {ImageOff} from "lucide-react";
import {typeColors} from "./data";
export default function ImageContainer({pokemonData, darkMode}) {

  //* Capitalizing 1st letter of pokemon name
  const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  //* Getting the theme color of the pokemon based on it's type
  const shadowColor = typeColors[pokemonData.types[0].type.name].color;

  //* Image loaded state
  const[imageStatus, setImageStatus] = useState("loading");

    return (
    //* Image & Text Container
    <div className="w-full h-full flex border-b md:border-b-0 md:border-r
    border-gray-200 dark:border-gray-700
      flex-col justify-center items-center flex-1 py-10
      gap-6 transition-colors duration-300 rounded-t-2xl
      md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none overflow-hidden"
      style={{
        backgroundColor: `${shadowColor}10`,
      }}
    >
      {/*//* Image Container */}
      <div className="relative w-60 h-60 flex items-center justify-center">
        {/*//* "Loading..." animation if the image isn't loaded yet" */}
        {imageStatus === "loading" &&
        <AnimatePresence>
          <motion.p className="font-mono dark:text-off-white
            font-bold absolute animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.p>
        </AnimatePresence>
        }
        {/*//* "Error message" if the image fails to load" */}
        {imageStatus === "error" &&
        <AnimatePresence>
          <motion.div className="font-mono flex flex-col gap-4
            justify-center items-center dark:text-off-white
            font-bold absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageOff className="w-10 h-auto"/>
            <p className="text-center">Image can't be loaded, Sorry :(</p>
          </motion.div>
        </AnimatePresence>
        }
        {/*//* Pokemon image */}
        <motion.img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="w-60 h-60 object-fill"
          style={{
            filter: `drop-shadow(0 24px 64px ${shadowColor})`,
            willChange: "filter"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={imageStatus === "loaded" ? { opacity: 1, scale: 1}:{ opacity: 0, scale: 0}}
          transition={{ duration: 0.25 }}
          onLoad={() => setImageStatus("loaded")}
          onError={() => setImageStatus("error")}
        />
      </div>
      {/*//* Number, Name and Types */}
      <div className="flex flex-col items-center gap-3">
        {/*//* Number */}
        <p className="font-mono font-black"
          style={{
            color: `${shadowColor}`
          }}
        >
          #{pokemonData.id.toString().padStart(3, "0")}
        </p>
        {/*//* Name */}
        <p className="font-outfit dark:text-off-white font-bold text-3xl">{pokemonName}</p>
        {/*//* Types */}
        <div className="flex gap-3">
          {pokemonData.types.map((t) => (
            <p className="font-mono font-bold text-xs py-1 px-3 rounded-2xl"
              key={t.type.name}
              style={!darkMode ? {
                color: typeColors[t.type.name].color,
                backgroundColor: typeColors[t.type.name].bg,
                border: `1px solid ${typeColors[t.type.name].color}`
              }: {
                color: "var(--color-off-white)",
                backgroundColor: `${typeColors[t.type.name].color}30`,
                border: `1px solid ${typeColors[t.type.name].color}`,
              }}
            >
              {t.type.name.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
      {/*//* Height and Weight */}
      <div className="flex gap-8 items-center justify-center font-outfit font-bold ">
        <motion.div className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-md text-gray-500 dark:text-gray-400">HEIGHT</p>
          <p className="font-mono dark:text-off-white text-sm">{pokemonData.height / 10} m</p>
        </motion.div>
        <motion.div className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-md text-gray-500 dark:text-gray-400">WEIGHT</p>
          <p className="font-mono dark:text-off-white text-sm">{pokemonData.weight / 10} kg</p>
        </motion.div>
      </div>
    </div>
  )
}