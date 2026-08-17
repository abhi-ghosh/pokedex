import { useState } from "react";
import {statButtons} from "./data";
import StatPill from "./StatPill";
import { statColors } from "./data";
export default function Stats({pokemonData}){

  //* Button state for stat buttons (Stats, Moves, Info)
  const [button, setButton] = useState("Stats");

  return (
    //*Stats section div
    <div className="flex-1 w-full md:max-w-1/2 bg-card
    dark:bg-navy flex flex-col justify-top gap-5 p-10 px-4
      md:p-10 rounded-b-2xl md:rounded-r-2xl"
    >
      {/*//* Stat buttons div */}
      <div className="flex flex-row gap-2 items-center
        justify-evenly p-1 bg-off-white dark:bg-navy-dark font-outfit
        font-bold rounded-full">
        {/*//* Stat buttons mapped over statButtons array */}
        {statButtons.map((stat)=>(
          <button className={`flex-1 py-2 px-6,
            rounded-3xl cursor-pointer
              ${button === stat ? "bg-card dark:text-off-white dark:bg-navy" :
                "text-gray-500 hover:bg-gray-500/10 dark:hover:bg-navy/60"
              }
              transition-colors duration-300`
            }
            onClick={() => setButton(stat)}
            key={stat}
          >
            {stat}
          </button>
        ))}
      </div>
      {/*//* Base stats & total stat */}
      <div className="flex flex-row align-center text-gray-500
      justify-between">
        <p className="font-bold font-outfit">BASE STATS</p>
        <p className="font-bold font-mono">
          Total: {pokemonData.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {pokemonData.stats.map((stat) => (
          <StatPill stat={stat.base_stat} key={stat.stat.name}
            name={statColors[stat.stat.name].label}
            color={statColors[stat.stat.name].color}
          />
        ))}
      </div>
    </div>
  )
}