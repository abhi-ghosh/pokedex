import MovesPill from "./MovesPill";
import {versions, learnMethods} from "./data";
import {useState} from "react";
import MoveMethods from "./MoveMethods";
import { motion, AnimatePresence } from "motion/react"
export default function Moves({pokemonData, typeColors, darkMode, pokeMoves}) {

  //* Version series state for the dropdown
  const [versionSeries, setVersionSeries] = useState("red-blue");

  //* Finding the selected version object for the select input border color
  const selectedVersion = versions.find(v => v.value === versionSeries);

  //* Transforming the API data pokemonData & pokeMoves into objects containing the data needed by the UI
  const movesArr = pokemonData.moves.map(move=>{
    let movesObj = {
      pwr: null,
      acc:null,
      move:null,
      type:null,
      ver:null
    }
    movesObj.pwr = (pokeMoves.find(m => m.name === move.move.name)).power
    movesObj.acc = (pokeMoves.find(m => m.name === move.move.name)).accuracy
    movesObj.move = move.move.name[0].toUpperCase() + move.move.name.slice(1)
    movesObj.type = (pokeMoves.find(m => m.name === move.move.name)).type.name.toUpperCase()

    //* Finding the move's data for the selected version group
    //* A move may not be available in every version group
    movesObj.ver =  move.version_group_details.find(v=>v.version_group.name === versionSeries)

    return movesObj
  } )

  return (

    //* Main Moves container
    <motion.div className="transition-colors duration-300 flex
      flex-col gap-5 overflow-y-scroll scrollbar-none"
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration: 0.15, ease:"easeOut"}}
    >

      {/*//* Version series dropdown */}
      <select name="version" className="font-outfit dark:text-off-white border-x-8
        w-full p-3 rounded-full text-center text-sm lg:text-base font-bold cursor-pointer appearance-none
        bg-off-white dark:bg-navy-dark focus:outline-navy-dark dark:focus:outline-off-white
        hover:bg-navy/10 dark:hover:bg-off-white/10 transition-colors duration-200"
        id="version" onChange={(e) => setVersionSeries(e.target.value)}
        style={{borderColor: selectedVersion.color}}
      >
        {/*//* Mapping over the versions array */}
        {versions.map(version => <option key={version.name} value={version.value}>{version.name}</option>)}
      </select>

      {/*//* Moves container */}
      <div className="flex flex-col gap-3">

        {/*//* Checking if the learn method (e.g. level-up, egg) exists for at least one move */}
        {learnMethods.map(method => {
          const hasMoves = movesArr.some(
            move => move.ver && method.name === move.ver.move_learn_method.name
          );

          //*  If no moves use this learn method, don't render the section
          if (!hasMoves) return null;

          //* If moves use this learn method, render the MoveMethods component
          return (
          <MoveMethods key={method.name} heading={method.heading} description={method.description}>
            <div className="flex flex-col gap-2 w-full">
              <AnimatePresence mode="popLayout">

                {/*//* Mapping over the moves array and rendering a MovesPill for each matching move */}
                {/*//* The move must exist in the selected version group and use the current learn method from the learnMethods array */}
                {movesArr.map(move => {
                  let level = null;
                  if(move.ver && method.name === move.ver.move_learn_method.name){

                    //* Setting the level based on the learn method
                    switch (method.name) {
                      case ("level-up"):
                        level = `Lvl: ${move.ver.level_learned_at}`;
                        break;
                      case ("machine"):
                        level = "T/M";
                        break;
                      case ("egg"):
                        level = "Egg";
                        break;
                      case ("tutor"):
                        level = "Tutor";
                        break;
                    }

                    return (
                      //* Using motion.div for the animation
                      <motion.div
                        className="w-full"
                        key={move.move}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <MovesPill
                          borderColor={typeColors[move.type.toLowerCase()].color}
                          backgroundColor = {!darkMode ? typeColors[move.type.toLowerCase()].bg : `${typeColors[move.type.toLowerCase()].color}30`}
                          color={!darkMode ? typeColors[move.type.toLowerCase()].color : "var(--color-off-white)"}
                          pwr={move.pwr || "-"}
                          acc={move.acc || "-"}
                          move={move.move.toUpperCase()}
                          type={move.type}
                          lvl={level}
                        />
                      </motion.div>
                    )
                  }
                })}
              </AnimatePresence>
            </div>
          </MoveMethods>
        );
        })}
      </div>
    </motion.div>
  )
}